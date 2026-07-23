package com.cimb.demo;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.cimb.demo.config.SecureModeState;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * End-to-end wiring tests across all four modules, driven through the HTTP API on H2.
 */
@SpringBootTest
@AutoConfigureMockMvc
class CimbDemoApplicationTests {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;
    @Autowired SecureModeState secureMode;

    @AfterEach
    void resetMode() {
        secureMode.setSecure(false);
    }

    private void setSecure(boolean value) throws Exception {
        mvc.perform(post("/api/secure-mode").contentType(MediaType.APPLICATION_JSON)
                .content("{\"secure\":" + value + "}")).andExpect(status().isOk());
    }

    private JsonNode postJson(String path, String body, String token) throws Exception {
        var req = post(path).contentType(MediaType.APPLICATION_JSON).content(body);
        if (token != null) req = req.header("X-Session-Token", token);
        MvcResult res = mvc.perform(req).andReturn();
        String content = res.getResponse().getContentAsString();
        return content.isEmpty() ? json.createObjectNode() : json.readTree(content);
    }

    @Test
    void contextLoads() {
    }

    @Test
    void module1_vulnerableLogin_acceptsPasswordPlusExtra() throws Exception {
        setSecure(false);
        JsonNode r = postJson("/api/auth/login",
                "{\"username\":\"user\",\"password\":\"Password1!IGNORED_EXTRA\"}", null);
        assertThat(r.get("success").asBoolean()).isTrue();
        assertThat(r.has("token")).isTrue();
    }

    @Test
    void module1_secureLogin_rejectsExtra_andRequiresOtp() throws Exception {
        setSecure(true);

        // Password + extra is now rejected outright.
        mvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\",\"password\":\"Password1!IGNORED_EXTRA\"}"))
                .andExpect(status().isUnauthorized());

        // Correct password triggers the OTP second factor; verify completes the login.
        JsonNode step1 = postJson("/api/auth/login",
                "{\"username\":\"user\",\"password\":\"Password1!\"}", null);
        assertThat(step1.get("mfaRequired").asBoolean()).isTrue();
        String challengeId = step1.get("challengeId").asText();
        String otp = step1.get("demoOtp").asText();

        JsonNode step2 = postJson("/api/auth/verify-otp",
                "{\"challengeId\":\"" + challengeId + "\",\"code\":\"" + otp + "\"}", null);
        assertThat(step2.get("success").asBoolean()).isTrue();
        assertThat(step2.has("token")).isTrue();
    }

    @Test
    void module2_vulnerablePayment_succeedsWithCardDetailsOnly() throws Exception {
        setSecure(false);
        String token = loginVulnerable("user", "Password1!");
        String body = "{\"amount\":\"250.00\",\"merchant\":\"Shopee MY\","
                + "\"cardNumber\":\"4111111111111111\",\"expiry\":\"12/28\",\"cvv\":\"123\"}";
        JsonNode r = postJson("/api/payments/pay", body, token);
        assertThat(r.get("status").asText()).isEqualTo("COMPLETED"); // no OTP, no signature — the bug
    }

    @Test
    void module2_securePayment_rejectsTamperedInstruction() throws Exception {
        String token = loginVulnerable("user", "Password1!");
        setSecure(true);

        JsonNode prep = postJson("/api/payments/prepare",
                "{\"amount\":\"250.00\",\"merchant\":\"Shopee MY\",\"cardNumber\":\"4111111111111111\"}", token);
        String ref = prep.get("paymentRef").asText();
        String signature = prep.get("signature").asText();
        String otp = prep.get("demoOtp").asText();

        // Amount altered after signing -> signature no longer matches -> rejected (400).
        String tampered = "{\"paymentRef\":\"" + ref + "\",\"amount\":\"999.00\",\"merchant\":\"Shopee MY\","
                + "\"cardNumber\":\"4111111111111111\",\"expiry\":\"12/28\",\"cvv\":\"123\","
                + "\"signature\":\"" + signature + "\",\"otp\":\"" + otp + "\"}";
        mvc.perform(post("/api/payments/pay").header("X-Session-Token", token)
                        .contentType(MediaType.APPLICATION_JSON).content(tampered))
                .andExpect(status().isBadRequest());
    }

    @Test
    void module3_vulnerableTransfer_doubleFire_debitsTwice() throws Exception {
        setSecure(false);
        String token = loginVulnerable("user", "Password1!");

        String body = "{\"fromAccount\":\"7048123945\",\"toAccount\":\"8012345678\","
                + "\"amount\":\"50.00\",\"idempotencyKey\":\"dup-key-1\"}";
        JsonNode first = postJson("/api/transfers", body, token);
        JsonNode second = postJson("/api/transfers", body, token);

        assertThat(first.get("status").asText()).isEqualTo("COMPLETED");
        assertThat(second.get("status").asText()).isEqualTo("COMPLETED"); // both debit — the bug
        assertThat(second.get("newSourceBalance").decimalValue())
                .isLessThan(first.get("newSourceBalance").decimalValue());
    }

    @Test
    void module3_secureTransfer_duplicateKey_isBlocked() throws Exception {
        // Log in first (vulnerable) so we have a session, then switch to secure for the transfer.
        String token = loginVulnerable("user", "Password1!");
        setSecure(true);

        String body = "{\"fromAccount\":\"7048123945\",\"toAccount\":\"8012345678\","
                + "\"amount\":\"50.00\",\"idempotencyKey\":\"dup-key-secure\"}";
        mvc.perform(post("/api/transfers").header("X-Session-Token", token)
                .contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isOk());
        // Second submit with the same key is rejected with 409.
        mvc.perform(post("/api/transfers").header("X-Session-Token", token)
                .contentType(MediaType.APPLICATION_JSON).content(body)).andExpect(status().isConflict());
    }

    @Test
    void module4_rawDbView_deniedForCustomer_allowedForAdmin() throws Exception {
        String customer = loginVulnerable("user", "Password1!");
        mvc.perform(get("/api/accounts/raw").header("X-Session-Token", customer))
                .andExpect(status().isForbidden());

        String admin = loginVulnerable("admin", "Admin123!");
        mvc.perform(get("/api/accounts/raw").header("X-Session-Token", admin))
                .andExpect(status().isOk());
    }

    /** Helper: log in while Secure Mode is OFF (single step) and return the session token. */
    private String loginVulnerable(String user, String pass) throws Exception {
        boolean previous = secureMode.isSecure();
        secureMode.setSecure(false);
        JsonNode r = postJson("/api/auth/login",
                "{\"username\":\"" + user + "\",\"password\":\"" + pass + "\"}", null);
        secureMode.setSecure(previous);
        return r.get("token").asText();
    }
}
