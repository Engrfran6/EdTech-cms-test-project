import type {LinksFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import {prisma} from "../utils/prisma.server";
import {getSession} from "../utils/session.server";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./global.css";

export async function loader({request}) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return {user: null};
  }

  const user = await prisma.profiles.findUnique({
    where: {userId: userId},
    select: {id: true, fullName: true, avatarUrl: true},
  });
  return {user};
}

export const links: LinksFunction = () => [{rel: "stylesheet", href: "/build/_assets/global.css"}];

export default function App() {
  const {user} = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-gray-900">
        <Navbar user={user} />

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          <Outlet />
        </main>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
