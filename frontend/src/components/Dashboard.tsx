import { useState } from "react";
import type { UserInfo } from "../api";
import AccountsPanel from "./AccountsPanel";
import PaymentPanel from "./PaymentPanel";
import TransferPanel from "./TransferPanel";
import RawDbPanel from "./RawDbPanel";
import AuditPanel from "./AuditPanel";

type Tab = "accounts" | "payment" | "transfer" | "encryption" | "audit";

const TABS: { id: Tab; label: string; tag?: string }[] = [
  { id: "accounts", label: "My Accounts" },
  { id: "payment", label: "Card Payment", tag: "CWE-287" },
  { id: "transfer", label: "Fund Transfer", tag: "CWE-675" },
  { id: "encryption", label: "Encryption / Raw DB", tag: "CWE-311" },
  { id: "audit", label: "Audit Log", tag: "SR5" },
];

export default function Dashboard(props: { user: UserInfo; secure: boolean }) {
  const [tab, setTab] = useState<Tab>("accounts");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${
              tab === t.id
                ? "border-[var(--cimb-red)] text-[var(--cimb-red)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
            {t.tag && (
              <span className="ml-1 rounded bg-gray-100 px-1 text-[10px] text-gray-500">
                {t.tag}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "accounts" && <AccountsPanel />}
      {tab === "payment" && <PaymentPanel secure={props.secure} />}
      {tab === "transfer" && <TransferPanel secure={props.secure} />}
      {tab === "encryption" && (
        <RawDbPanel user={props.user} secure={props.secure} />
      )}
      {tab === "audit" && <AuditPanel user={props.user} />}
    </div>
  );
}
