import { useEffect, useState } from "react";
import { api, setToken, type UserInfo } from "./api";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [secure, setSecure] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get<{ secure: boolean }>("/api/secure-mode")
      .then((r) => setSecure(r.secure))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  async function toggleSecure(next: boolean) {
    const r = await api.post<{ secure: boolean }>("/api/secure-mode", { secure: next });
    setSecure(r.secure);
  }

  function onLogin(u: UserInfo, token: string) {
    setToken(token);
    setUser(u);
  }

  function onLogout() {
    api.post("/api/auth/logout").catch(() => {});
    setToken(null);
    setUser(null);
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen">
      <Header user={user} secure={secure} onToggleSecure={toggleSecure} onLogout={onLogout} />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {user ? (
          <Dashboard user={user} secure={secure} />
        ) : (
          <Login secure={secure} onLogin={onLogin} />
        )}
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500">
        Academic prototype — CIMB Clicks Security Demonstration. Not a real bank.
      </footer>
    </div>
  );
}
