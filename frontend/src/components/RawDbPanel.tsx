import { useEffect, useState } from "react";
import { api, type UserInfo } from "../api";
import { Button, ModuleCard, Notice } from "./ui";

interface RawRow {
  id: string;
  owner: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  nric: string;
  cardNumber: string;
  encrypted: boolean;
}

export default function RawDbPanel(props: { user: UserInfo; secure: boolean }) {
  const [rows, setRows] = useState<RawRow[]>([]);
  const [denied, setDenied] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null);
  const [backup, setBackup] = useState<{ path: string; encrypted: boolean; preview: string } | null>(
    null
  );

  async function refresh() {
    setDenied(null);
    try {
      const r = await api.get<{ rows: RawRow[] }>("/api/accounts/raw");
      setRows(r.rows);
    } catch (e) {
      setDenied((e as Error).message);
    }
  }
  useEffect(() => {
    refresh().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.secure]);

  async function repersist() {
    setMsg(null);
    try {
      const r = await api.post<{ message: string }>("/api/accounts/repersist");
      setMsg({ kind: "ok", text: r.message });
      refresh();
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    }
  }

  async function exportBackup() {
    setMsg(null);
    try {
      const r = await api.post<{ path: string; encrypted: boolean; preview: string }>(
        "/api/accounts/backup"
      );
      setBackup(r);
      setMsg({
        kind: "ok",
        text: `Backup written to ${r.path} (${r.encrypted ? "AES-256 encrypted" : "PLAINTEXT"})`,
      });
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    }
  }

  if (props.user.role !== "ADMIN") {
    return (
      <ModuleCard title="Module 4 — Raw Database View" cwe="CWE-311" sr="SR1 / SR6 / SR7">
        <Notice kind="err">
          Access denied. The Raw Database View is restricted to the <b>admin</b> role (SR7). You are
          signed in as <b>{props.user.role}</b>. Log in as <b>admin / Admin123!</b> to view it.
        </Notice>
      </ModuleCard>
    );
  }

  return (
    <div className="space-y-4">
      <ModuleCard title="Module 4 — Raw Database View (reads straight from storage)" cwe="CWE-311" sr="SR1 / SR6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Button variant="dark" onClick={repersist}>
            Re-persist accounts in current mode
          </Button>
          <Button variant="outline" onClick={refresh}>
            Refresh raw view
          </Button>
          <Button variant="outline" onClick={exportBackup}>
            Export mock backup file
          </Button>
          <span className={`text-xs font-bold ${props.secure ? "text-green-700" : "text-[var(--cimb-red)]"}`}>
            {props.secure ? "SECURE ON → new writes are AES-256 encrypted" : "SECURE OFF → writes are plaintext"}
          </span>
        </div>

        {msg && <div className="mb-3">{<Notice kind={msg.kind}>{msg.text}</Notice>}</div>}
        {denied && <Notice kind="err">{denied}</Notice>}

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left uppercase text-gray-500">
                <th className="py-1">Account</th>
                <th>NRIC (stored)</th>
                <th>Card Number (stored)</th>
                <th>At rest</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b last:border-0 align-top">
                  <td className="py-1 font-mono">{r.accountNumber}</td>
                  <td className="max-w-[220px] break-all font-mono text-gray-700">{r.nric}</td>
                  <td className="max-w-[220px] break-all font-mono text-gray-700">{r.cardNumber}</td>
                  <td>
                    {r.encrypted ? (
                      <span className="font-semibold text-green-700">encrypted</span>
                    ) : (
                      <span className="font-semibold text-red-700">plaintext</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          This panel dumps the exact bytes on disk with no decryption. Flip Secure Mode, click{" "}
          <b>Re-persist accounts</b>, and watch NRIC / card number change from readable plaintext to{" "}
          <span className="font-mono">enc:v1:…</span> ciphertext.
        </p>
      </ModuleCard>

      {backup && (
        <ModuleCard title="Mock Backup Export (on disk)" cwe="CWE-311" sr="SR6">
          <p className="mb-2 text-xs text-gray-500">
            File: <span className="font-mono">{backup.path}</span> —{" "}
            {backup.encrypted ? (
              <span className="font-semibold text-green-700">AES-256 encrypted</span>
            ) : (
              <span className="font-semibold text-red-700">PLAINTEXT (readable)</span>
            )}
          </p>
          <pre className="max-h-64 overflow-auto rounded bg-gray-900 p-3 text-[11px] text-green-200">
            {backup.preview}
          </pre>
        </ModuleCard>
      )}
    </div>
  );
}
