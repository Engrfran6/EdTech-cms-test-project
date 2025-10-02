import { Form, Link, useLocation } from "@remix-run/react";

type User = {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
} | null;

export default function Navbar({ user }: { user: User }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/articles";
  const isRegister = location.pathname === "/register";

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Traibetech CMS
        </h1>
        <nav className="space-x-4 flex items-center">
          {user ? (
            <>
              <div className="flex items-center space-x-3">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName || "User"}
                    className="w-8 h-8 rounded-full border"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-medium">
                    {user.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                )}
                <span className="text-gray-700">{user.fullName}</span>
              </div>
              <Form method="post" action="/logout">
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </Form>
            </>
          ) : (
            <>
              {/* only show login link if not already on home (/) */}
              {!isHome && (
                <Link
                  to="/"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              )}
              {!isRegister && (
                <Link
                  to="/register"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Register
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
