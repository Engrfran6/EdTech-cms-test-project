import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { destroySession, getSession } from "../../utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutPage() {
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Are you sure you want to logout?</h2>
      <Form method="post" action="/logout">
        <button
          type="submit"
          style={{
            padding: "0.5rem 1.5rem",
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "1rem",
          }}
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
