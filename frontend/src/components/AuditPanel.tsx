import { useEffect, useState } from "react";
import { api, type UserInfo } from "../api";
import { Button, ModuleCard, Notice } from "./ui";

interface Entry {
  id: number;
  ts: string;
  actor: string;
  action: string;
  details: string;
  prevHash: string;
  entryHash: string;
}

export default function AuditPanel(props: { user: UserInfo }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [denied, setDenied] = useState<string | null>(null);
  const [verify, setVerify] = useState<{ valid: boolean; entries: number } | null>(null);

  async function refresh() {
    setDenied(null);
    try {
      const r = await api.get<{ entries: Entry[] }>("/api/audit");
      setEntries(r.entries);
    } catch (e) {
      setDenied((e as Error).message);
    }
  }
  useEffect(() => {
    refresh().catch(() => {});
  }, []);

  async function doVerify() {
    try {
      const r = await api.get<{ valid: boolean; entries: number }>("/api/audit/verify");
      setVerify(r);
    } catch (e) {
      setDenied((e as Error).message);
    }
  }

  if (props.user.role !== "ADMIN") {
    return (
      <ModuleCard title="Audit Log (hash-chained)" sr="SR5 / SR7">
        <Notice kind="err">
          Access denied. The audit log is restricted to the <b>admin</b> role (SR7). You are signed
          in as <b>{props.user.role}</b>.
        </Notice>
      </ModuleCard>
    );
  }

  return (
    <ModuleCard title="Audit Log — append-only, SHA-256 hash chain" sr="SR5">
      <div className="mb-3 flex items-center gap-2">
        <Button variant="outline" onClick={refresh}>
          Refresh
        </Button>
        <Button variant="dark" onClick={doVerify}>
          Verify chain integrity
        </Button>
        {verify && (
          <span className={`text-sm font-bold ${verify.valid ? "text-green-700" : "text-red-700"}`}>
            {verify.valid
              ? `Chain valid over ${verify.entries} entries ✓`
              : "Chain BROKEN — tampering detected ✗"}
          </span>
        )}
      </div>
      {denied && <Notice kind="err">{denied}</Notice>}
      <div className="max-h-96 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left uppercase text-gray-500">
              <th className="py-1">#</th>
              <th>Time</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Details</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b last:border-0 align-top">
                <td className="py-1">{e.id}</td>
                <td className="whitespace-nowrap text-gray-500">{e.ts.replace("T", " ").slice(0, 19)}</td>
                <td>{e.actor}</td>
                <td className="font-semibold">{e.action}</td>
                <td className="max-w-[240px] break-words text-gray-600">{e.details}</td>
                <td className="font-mono text-gray-400">{e.entryHash.slice(0, 10)}…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleCard>
  );
}
