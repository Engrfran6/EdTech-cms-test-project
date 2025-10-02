import { createCookieSessionStorage, redirect } from "@remix-run/node";

// secure cookie storage
const sessionSecret = process.env.SESSION_SECRET || "super-secret-key";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

// using data access layer DAL for user session management
export async function requireUserSession(request: Request) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/");
  }

  return userId;
}

export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: any) {
  return sessionStorage.destroySession(session);
}
