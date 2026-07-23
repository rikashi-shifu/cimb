import { useEffect, useState } from "react";
import { api } from "../api";
import { Button, Field, ModuleCard, Notice } from "./ui";

interface TransferRow {
  id: string;
  createdAt: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  idempotencyKey: string;
  status: string;
  secureMode: boolean;
}

function newKey() {
  return crypto.randomUUID();
}

export default function TransferPanel(props: { secure: boolean }) {
  const [from, setFrom] = useState("7048123945");
  const [to, setTo] = useState("8012345678");
  const [amount, setAmount] = useState("100.00");
  const [key, setKey] = useState(newKey());
  const [results, setResults] = useState<
    { kind: "ok" | "err"; text: string }[]
  >([]);
  const [rows, setRows] = useState<TransferRow[]>([]);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const r = await api.get<{ transfers: TransferRow[] }>("/api/transfers");
    setRows(r.transfers);
  }
  useEffect(() => {
    refresh().catch(() => {});
  }, []);

  async function submit(count: number) {
    setBusy(true);
    setResults([]);
    const body = {
      fromAccount: from,
      toAccount: to,
      amount,
      idempotencyKey: key,
    };
    const calls = Array.from({ length: count }, () =>
      api
        .post<{ status: string; newSourceBalance: number }>(
          "/api/transfers",
          body,
        )
        .then((r) => ({
          kind: "ok" as const,
          text: `${r.status} — new source balance MYR ${Number(r.newSourceBalance).toFixed(2)}`,
        }))
        .catch((e) => ({ kind: "err" as const, text: (e as Error).message })),
    );
    const settled = await Promise.all(calls);
    setResults(settled);
    setBusy(false);
    refresh().catch(() => {});
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ModuleCard title="Module 3 — Fund Transfer" cwe="CWE-840" sr="SR5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="From Account" value={from} onChange={setFrom} />
          <Field label="To Account" value={to} onChange={setTo} />
          <Field label="Amount (MYR)" value={amount} onChange={setAmount} />
          <div className="flex items-end">
            <button
              onClick={() => setKey(newKey())}
              className="text-xs text-[var(--cimb-red)] underline"
            >
              regenerate idempotency key
            </button>
          </div>
        </div>
        <p className="mt-2 break-all text-xs text-gray-500">
          idempotency key: <span className="font-mono">{key}</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={() => submit(1)} disabled={busy}>
            Submit once
          </Button>
          <Button variant="dark" onClick={() => submit(2)} disabled={busy}>
            Fire the SAME transfer twice
          </Button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {props.secure
            ? "Secure ON: the duplicate carries the same idempotency key and is rejected (409) — the account is debited only once."
            : "Secure OFF: the idempotency key is ignored — firing twice debits the account twice."}
        </p>

        {results.length > 0 && (
          <div className="mt-3 space-y-2">
            {results.map((r, i) => (
              <Notice key={i} kind={r.kind}>
                Request #{i + 1}: {r.text}
              </Notice>
            ))}
          </div>
        )}
      </ModuleCard>

      <ModuleCard title="Recent Transfers">
        <div className="max-h-80 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left uppercase text-gray-500">
                <th className="py-1">From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="py-1 font-mono">{t.fromAccount}</td>
                  <td className="font-mono">{t.toAccount}</td>
                  <td>{Number(t.amount).toFixed(2)}</td>
                  <td className="font-semibold text-green-700">{t.status}</td>
                  <td>{t.secureMode ? "SECURE" : "VULN"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModuleCard>
    </div>
  );
}
