import { useEffect, useState } from "react";
import { api } from "../api";
import { ModuleCard } from "./ui";

interface Account {
  id: string;
  owner: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  nric: string;
  cardNumber: string;
}

export default function AccountsPanel() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ accounts: Account[] }>("/api/accounts")
      .then((r) => setAccounts(r.accounts))
      .catch((e) => setErr((e as Error).message));
  }, []);

  return (
    <ModuleCard title="My Accounts Overview">
      {err && <p className="text-sm text-red-700">{err}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-gray-500">
              <th className="py-2">Account</th>
              <th>Number</th>
              <th>NRIC</th>
              <th>Card</th>
              <th className="text-right">Balance (MYR)</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-b last:border-0">
                <td className="py-2 font-medium">{a.accountName}</td>
                <td className="font-mono text-gray-600">{a.accountNumber}</td>
                <td className="font-mono text-gray-600">{a.nric}</td>
                <td className="font-mono text-gray-600">{a.cardNumber}</td>
                <td className="text-right font-semibold">{Number(a.balance).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        This is the application view (sensitive fields decrypted for the owner). To see how the
        same fields sit in storage, open the <b>Encryption / Raw DB</b> tab.
      </p>
    </ModuleCard>
  );
}
