import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { commitSession, getSession } from "../../utils/session.server";
import { supabase } from "../../utils/supabase.server";
import Login from "../components/login";

export async function loader({ request }) {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (userId) {
    return redirect("/articles");
  }

  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  // create cookie to manage session
  const session = await getSession(request);
  session.set("userId", data.user?.id);

  return redirect("/articles", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();

  return <Login actionData={actionData} />;
}
