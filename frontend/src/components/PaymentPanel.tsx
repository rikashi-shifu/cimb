import { useEffect, useState } from "react";
import { api } from "../api";
import { Button, Field, ModuleCard, Notice } from "./ui";

interface PaymentRow {
  id: string;
  createdAt: string;
  merchant: string;
  amount: number;
  cardLast4: string;
  status: string;
  secureMode: boolean;
  note: string;
}

export default function PaymentPanel(props: { secure: boolean }) {
  const [merchant, setMerchant] = useState("Shopee MY");
  const [amount, setAmount] = useState("250.00");
  const [card, setCard] = useState("4111 1111 1111 1111");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [tamper, setTamper] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null);
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const r = await api.get<{ payments: PaymentRow[] }>("/api/payments");
    setRows(r.payments);
  }
  useEffect(() => {
    refresh().catch(() => {});
  }, []);

  async function pay() {
    setBusy(true);
    setMsg(null);
    try {
      let body: Record<string, unknown> = {
        amount,
        merchant,
        cardNumber: card,
        expiry,
        cvv,
      };

      if (props.secure) {
        const prep = await api.post<{
          paymentRef: string;
          signature: string;
          demoOtp: string;
        }>("/api/payments/prepare", { amount, merchant, cardNumber: card });

        body = {
          ...body,
          paymentRef: prep.paymentRef,
          signature: prep.signature,
          amount: tamper ? (Number(amount) + 100).toFixed(2) : amount, // altered after signing
          otp: wrongOtp ? "000000" : prep.demoOtp,
        };
      }

      const r = await api.post<{ status: string; note: string }>("/api/payments/pay", body);
      setMsg({ kind: "ok", text: `${r.status} — ${r.note}` });
    } catch (e) {
      setMsg({ kind: "err", text: (e as Error).message });
    } finally {
      setBusy(false);
      refresh().catch(() => {});
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ModuleCard title="Module 2 — Card Payment" cwe="CWE-345" sr="SR3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Merchant" value={merchant} onChange={setMerchant} />
          <Field label="Amount (MYR)" value={amount} onChange={setAmount} />
          <div className="col-span-2">
            <Field label="Card Number" value={card} onChange={setCard} />
          </div>
          <Field label="Expiry" value={expiry} onChange={setExpiry} />
          <Field label="CVV" value={cvv} onChange={setCvv} type="password" />
        </div>

        {props.secure && (
          <div className="mt-3 space-y-1 rounded border border-dashed border-gray-300 bg-gray-50 p-2 text-xs text-gray-600">
            <p className="font-semibold text-gray-700">Secure-mode attack simulations</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={tamper} onChange={(e) => setTamper(e.target.checked)} />
              Tamper amount after signing (should be rejected — altered instruction)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={wrongOtp}
                onChange={(e) => setWrongOtp(e.target.checked)}
              />
              Send wrong OTP (should be rejected)
            </label>
          </div>
        )}

        <div className="mt-3">
          <Button onClick={pay} disabled={busy}>
            {props.secure ? "Pay (3DS: OTP + signed)" : "Pay (non-3DS)"}
          </Button>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {props.secure
            ? "Secure ON: the server verifies a signed payment instruction and a valid OTP; unsigned/altered requests are rejected."
            : "Secure OFF: the payment completes with only card details — no OTP, no server verification (non-3DS)."}
        </p>

        {msg && <div className="mt-3">{<Notice kind={msg.kind}>{msg.text}</Notice>}</div>}
      </ModuleCard>

      <ModuleCard title="Recent Payments">
        <div className="max-h-80 overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left uppercase text-gray-500">
                <th className="py-1">Merchant</th>
                <th>Amount</th>
                <th>Card</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b last:border-0 align-top">
                  <td className="py-1">{p.merchant}</td>
                  <td>{Number(p.amount).toFixed(2)}</td>
                  <td className="font-mono">****{p.cardLast4}</td>
                  <td
                    className={
                      p.status === "COMPLETED"
                        ? "font-semibold text-green-700"
                        : "font-semibold text-red-700"
                    }
                  >
                    {p.status}
                  </td>
                  <td>{p.secureMode ? "SECURE" : "VULN"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModuleCard>
    </div>
  );
}
