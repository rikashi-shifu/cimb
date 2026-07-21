import type { ReactNode } from "react";

export function ModuleCard(props: {
  title: string;
  cwe?: string;
  sr?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
        <h2 className="text-base font-semibold text-gray-800">{props.title}</h2>
        <div className="flex gap-2">
          {props.cwe && (
            <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-[var(--cimb-red)]">
              {props.cwe}
            </span>
          )}
          {props.sr && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {props.sr}
            </span>
          )}
        </div>
      </div>
      <div className="px-4 py-4">{props.children}</div>
    </section>
  );
}

export function Button(props: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "dark" | "outline";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "rounded px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "bg-[var(--cimb-red)] text-white hover:brightness-95",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${base} ${variants[props.variant ?? "primary"]}`}
    >
      {props.children}
    </button>
  );
}

export function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{props.label}</span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[var(--cimb-red)]"
      />
    </label>
  );
}

export function Notice(props: { kind: "ok" | "err" | "info"; children: ReactNode }) {
  const styles: Record<string, string> = {
    ok: "bg-green-50 text-green-800 border-green-200",
    err: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    <div className={`rounded border px-3 py-2 text-sm ${styles[props.kind]}`}>{props.children}</div>
  );
}
