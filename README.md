# CIMB Clicks — Security Demonstration Prototype

An academic prototype for a **Software Security and Safety** assignment. It is a small online
banking app modelled loosely on CIMB Clicks whose only purpose is to demonstrate **four real
security vulnerabilities and their fixes**. Every vulnerability is demonstrable in two states
through a single global **Secure Mode** toggle in the UI header:

- **Secure Mode OFF** → the vulnerable behaviour (reproduces the historical bug)
- **Secure Mode ON** → the fixed behaviour with the security control active

The _same_ user action visibly succeeds as an attack when OFF and is blocked when ON.

| #   | Module                                                         | CWE     | Requirement |
| --- | -------------------------------------------------------------- | ------- | ----------- |
| 1   | Authentication (password truncation → full bcrypt + TOTP)      | CWE-303 | SR2         |
| 2   | Payment authorization (non-3DS → OTP + signed instruction)     | CWE-345 | SR3         |
| 3   | Duplicate transfer protection (double debit → idempotency key) | CWE-840 | SR5         |
| 4   | Encryption at rest (plaintext → AES-256 + encrypted backup)    | CWE-311 | SR1 / SR6   |

**Shared panels:** append-only, hash-chained **audit log** (SR5) and **role-based access
control** (SR7 — the Raw Database View and audit log are admin-only).

---

## Tech stack

- **Backend:** Java 21 + Spring Boot 3.4 (Maven)
- **Database:** Supabase (PostgreSQL)
- **Frontend:** React 19 + TypeScript + TailwindCSS (Vite), built and **served by the backend**
- **Password hashing:** bcrypt (`spring-security-crypto`)
- **OTP:** TOTP / RFC 6238 (implemented in-repo, simulating Secure2u)
- **Encryption:** AES-256-GCM (`javax.crypto`)

```
cimb/
├── backend/            Spring Boot app (all four modules + shared panels)
│   ├── src/main/java/com/cimb/demo/
│   │   ├── auth/        Module 1 — CWE-303
│   │   ├── payment/     Module 2 — CWE-345
│   │   ├── transfer/    Module 3 — CWE-840
│   │   ├── account/     Module 4 — CWE-311 (+ Raw DB View, backup)
│   │   ├── audit/       Hash-chained audit log (SR5)
│   │   ├── session/     Roles + RBAC (SR7)
│   │   ├── crypto/      AES-256-GCM
│   │   └── config/      Secure Mode toggle, seeding, properties
│   ├── src/main/resources/static/   ← built frontend lands here
│   └── src/test/java/...            JUnit tests (28)
├── frontend/           React + Tailwind source
├── supabase/schema.sql Run this once in the Supabase SQL editor
└── run.ps1             Loads backend/.env and starts the app
```

---

## Prerequisites

- **JDK 21** (the project targets Java 21; Maven here runs on `~/.jdks/openjdk-21.0.2`)
- **Maven 3.9+**
- **Node 20+** (only needed if you want to rebuild the frontend)
- A free **Supabase** project

---

## Setup

### 1. Create the database tables in Supabase

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and **Run**.
   This creates `users`, `accounts`, `transfers`, `payments`, and `audit_log`.
   (The app seeds demo rows on startup; the SQL only creates tables.)

### 2. Configure environment variables

Copy the template and fill it in:

```powershell
Copy-Item backend/.env.example backend/.env
```

Fill in `backend/.env`:

| Variable               | Where to get it                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_DB_URL`      | Supabase → **Project Settings → Database → Connection string → JDBC** (use the _Session pooler_ or _Direct connection_), e.g. `jdbc:postgresql://aws-0-<region>.pooler.supabase.com:5432/postgres` |
| `SUPABASE_DB_USERNAME` | usually `postgres.<project-ref>`                                                                                                                                                                   |
| `SUPABASE_DB_PASSWORD` | your database password                                                                                                                                                                             |
| `APP_ENCRYPTION_KEY`   | 32-byte AES-256 key, base64. Generate: `openssl rand -base64 32`                                                                                                                                   |
| `PAYMENT_SIGNING_KEY`  | any long random string                                                                                                                                                                             |
| `APP_BACKUP_DIR`       | leave as `./backups`                                                                                                                                                                               |

`run.ps1` automatically maps the `SUPABASE_DB_*` values above to Spring Boot's `SPRING_DATASOURCE_*`
settings and switches Hibernate to `update` for Supabase-backed runs.

### 3. Run

```powershell
./run.ps1
```

`run.ps1` loads `backend/.env` into the environment and runs `mvn spring-boot:run`.
Then open **http://localhost:8080**.

### Inspecting the local H2 memory database

When you run without Supabase variables, the app falls back to the in-memory H2 database.
If `backend/.env` contains `SUPABASE_DB_*` values, `run.ps1` will connect the app to Supabase instead,
so there is no H2 memory database to inspect in that run.

For the H2 run, open the embedded console from the Spring app at:

- URL: `http://localhost:8090/h2-console`
- JDBC URL: `jdbc:h2:mem:cimbdemo;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1`
- Username: `sa`
- Password: empty

If the console shows `Database "mem:cimbdemo" not found`, the app is not running on H2.
Temporarily remove or rename `backend/.env`, or delete the `SUPABASE_DB_*` lines, then start
the app again.

<details>
<summary>Prefer to run manually / on macOS / Linux?</summary>

Export the variables from `backend/.env` in your shell, then:

```bash
cd backend
mvn spring-boot:run
```

</details>

### Demo accounts (seeded on startup)

| Username | Password     | Role     |
| -------- | ------------ | -------- |
| `user`   | `Password1!` | CUSTOMER |
| `admin`  | `Admin123!`  | ADMIN    |

The on-screen OTP is displayed for you during the demo (no SMS is sent).

---

## Rebuilding the frontend (optional)

The compiled frontend is already committed under `backend/src/main/resources/static`. To change
the UI:

```powershell
cd frontend
npm install
npm run build        # outputs into ../backend/src/main/resources/static
```

During UI development you can run a hot-reloading dev server instead (proxies `/api` to :8080):

```powershell
cd frontend
npm run dev          # http://localhost:5173
```

---

## Running the tests

28 JUnit tests run entirely on in-memory **H2** — no Supabase credentials required:

```powershell
cd backend
mvn test
```

Coverage: AES round-trip & key validation, TOTP, the CWE-303 truncation vs full-compare, the
HMAC payment-signature verification, duplicate-transfer blocking, the audit hash chain
(including tamper detection), and an end-to-end HTTP walkthrough of all four modules plus RBAC.

---

## Demo script (exact clicks)

> The Secure Mode toggle is in the top-right header and is **always visible**. It starts **OFF**.

### Module 1 — Authentication (CWE-303 / SR2)

**Vulnerable (Secure OFF):**

1. On the login screen, user `user`, password `Password1!`.
2. Click **“Append ‘IGNORED_EXTRA’ to password”** → the password becomes `Password1!IGNORED_EXTRA`.
3. Click **Login** → **you are logged in.** The correct password + junk was accepted (truncated match).

**Fixed (Secure ON):**

1. Log out. Flip **Secure Mode ON**.
2. Repeat with the junk-appended password → **rejected** (“Invalid credentials”).
3. Enter the exact password `Password1!` → password accepted, an **OTP is shown on screen**.
4. Type the OTP → **logged in** with the second factor (Secure2u).

### Module 2 — Card Payment (CWE-345 / SR3) → _“Card Payment” tab_

**Vulnerable (Secure OFF):**

1. Leave the pre-filled card/amount. Click **Pay (non-3DS)** → **COMPLETED** with card details only —
   no OTP, no server verification.

**Fixed (Secure ON):**

1. Flip **Secure Mode ON**. Click **Pay (3DS: OTP + signed)** → **COMPLETED** (server verified the
   signed instruction and OTP).
2. Tick **“Tamper amount after signing”** and pay again → **REJECTED** (altered instruction).
3. Tick **“Send wrong OTP”** and pay again → **REJECTED** (invalid OTP).

### Module 3 — Fund Transfer (CWE-840 / SR5) → _“Fund Transfer” tab_

**Vulnerable (Secure OFF):**

1. Note the source balance. Click **“Fire the SAME transfer twice”** → **both requests COMPLETED**;
   the balance dropped **twice** (double debit).

**Fixed (Secure ON):**

1. Flip **Secure Mode ON**. Click **“regenerate idempotency key”**, then
   **“Fire the SAME transfer twice”** → request #1 **COMPLETED**, request #2 **blocked (409 duplicate)**;
   the balance dropped **once**.

### Module 4 — Encryption at rest (CWE-311 / SR1, SR6) → _“Encryption / Raw DB” tab (admin only)_

1. Log in as **admin / Admin123!** and open the **Encryption / Raw DB** tab.
2. **Secure OFF:** click **“Re-persist accounts in current mode”** → the Raw Database View shows
   NRIC and card numbers as **readable plaintext**. Click **“Export mock backup file”** → the backup
   preview is **plaintext JSON**.
3. Flip **Secure Mode ON**, click **“Re-persist accounts”** again → the same fields are now
   **`enc:v1:…` AES-256 ciphertext**. Export the backup again → the file is **encrypted**.

### Shared — Audit log & RBAC (SR5 / SR7)

1. Still as **admin**, open the **Audit Log** tab → every login/transfer/payment is a
   hash-chained entry. Click **“Verify chain integrity”** → _Chain valid ✓_.
2. Log out, log in as **user** (customer), open **Audit Log** or **Encryption / Raw DB** →
   **Access denied** (these panels are admin-only, SR7).

---

## Notes on what is mocked (per the assignment scope)

- **DuitNow / FPX gateway** — a single fake function returning success/failure.
- **Secure2u push / SMS** — the OTP is shown on screen / console instead of being sent.
- **Backup media** — a single exported file written to `APP_BACKUP_DIR` on disk.

This is **not a real bank** and deliberately contains no features beyond the four vulnerabilities
above and their shared panels.
