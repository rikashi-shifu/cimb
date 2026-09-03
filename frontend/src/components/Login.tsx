import { useState } from "react";
import { api, type LoginResponse, type UserInfo } from "../api";
import { Button, Field, ModuleCard, Notice } from "./ui";

export default function Login(props: {
  secure: boolean;
  onLogin: (user: UserInfo, token: string) => void;
}) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("Password1!");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState<{
    kind: "ok" | "err" | "info";
    text: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submitPassword() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.post<LoginResponse>("/api/auth/login", {
        username,
        password,
      });
      if (r.mfaRequired) {
        setChallengeId(r.challengeId!);
        setDemoOtp(r.demoOtp ?? null);
        setMsg({
          kind: "info",
          text: "Password accepted. Enter the Secure2u OTP below.",
        });
      } else if (r.success && r.token && r.user) {
        props.onLogin(r.user, r.token);
      }
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function submitOtp() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.post<LoginResponse>("/api/auth/verify-otp", {
        challengeId,
        code: otp,
      });
      if (r.success && r.token && r.user) {
        props.onLogin(r.user, r.token);
      }
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  function appendJunk() {
    setPassword((p) => p + "IGNORED_EXTRA");
  }

  return (
    <div className="mx-auto max-w-md">
      <ModuleCard
        title="Module 1 — Login (Authentication)"
        cwe="CWE-20"
        sr="SR2"
      >
        <p className="mb-3 text-sm text-gray-600">
          Please enter your login credentials.
        </p>

        {!challengeId && (
          <div className="space-y-3">
            <Field label="User ID" value={username} onChange={setUsername} />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              type="text"
            />

            <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-2 text-xs text-gray-600">
              <p className="font-semibold text-gray-700">CWE-20 attack demo</p>
              <p>
                The seeded password is{" "}
                <code className="font-mono">Password1!</code>. Append extra
                characters and log in:
              </p>
              <ul className="ml-4 mt-1 list-disc">
                <li>
                  <b>Secure OFF</b>: the correct password + junk still logs in
                  (truncated match).
                </li>
                <li>
                  <b>Secure ON</b>: the full password is compared exactly — junk
                  is rejected.
                </li>
              </ul>
              <button
                onClick={appendJunk}
                className="mt-1 text-(--cimb-red) underline"
              >
                Append "IGNORED_EXTRA" to password
              </button>
            </div>

            <Button type="button" onClick={submitPassword} disabled={busy}>
              Login
            </Button>
          </div>
        )}

        {challengeId && (
          <div className="space-y-3">
            {demoOtp && (
              <Notice kind="info">
                Secure2u (demo): your current OTP is{" "}
                <span className="font-mono text-lg font-bold">{demoOtp}</span>
              </Notice>
            )}
            <Field
              label="Enter OTP"
              value={otp}
              onChange={setOtp}
              placeholder="6-digit code"
            />
            <Button type="button" onClick={submitOtp} disabled={busy}>
              Verify OTP
            </Button>
          </div>
        )}

        {msg && (
          <div className="mt-3">
            {<Notice kind={msg.kind}>{msg.text}</Notice>}
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          Demo accounts: <b>user / Password1!</b> (customer) &nbsp;·&nbsp;{" "}
          <b>admin / Admin123!</b> (admin)
          <br />
          Mode is currently{" "}
          <b className={props.secure ? "text-green-700" : "text-(--cimb-red)"}>
            {props.secure ? "SECURE (ON)" : "VULNERABLE (OFF)"}
          </b>
          .
        </div>
      </ModuleCard>
    </div>
  );
}
