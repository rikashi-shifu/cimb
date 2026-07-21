import type { UserInfo } from "../api";

export default function Header(props: {
  user: UserInfo | null;
  secure: boolean;
  onToggleSecure: (next: boolean) => void;
  onLogout: () => void;
}) {
  const { user, secure } = props;
  return (
    <header className="border-b-4 border-[var(--cimb-red)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black italic text-[var(--cimb-red)]">CIMB</span>
          <span className="text-2xl font-light italic text-gray-700">Clicks</span>
          <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
            Security Demo
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Secure Mode toggle — always visible */}
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold ${
                secure ? "text-green-700" : "text-[var(--cimb-red)]"
              }`}
            >
              {secure ? "SECURE MODE: ON (fixed)" : "SECURE MODE: OFF (vulnerable)"}
            </span>
            <button
              role="switch"
              aria-checked={secure}
              onClick={() => props.onToggleSecure(!secure)}
              className={`relative h-6 w-12 rounded-full transition ${
                secure ? "bg-green-600" : "bg-gray-400"
              }`}
              title="Toggle Secure Mode"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  secure ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">{user.displayName}</div>
                <div className="text-xs text-gray-500">
                  role: <span className="font-semibold">{user.role}</span>
                </div>
              </div>
              <button
                onClick={props.onLogout}
                className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
