import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { prisma } from "../../utils/prisma.server";
import { supabase } from "../../utils/supabase.server";
import Signup from "../components/Register";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!fullName || !email || !password) {
    return json(
      { error: "Email, full name, and password are required" },
      { status: 400 }
    );
  }

  // 1. Creating a user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return json({ error: error.message }, { status: 400 });
  const user = data.user;
  if (!user) return json({ error: "User was not created" }, { status: 500 });

  // 2. then Create profile after auth success
  await prisma.profiles.create({
    data: {
      userId: user.id,
      fullName,
    },
  });

  // 3. If no session, user need to confirm email
  if (!data.session) {
    return redirect(`/check-email?email=${encodeURIComponent(email)}`);
  }

  // otherwise log them in, that is if email confirmation is disabled on supabase
  return redirect("/articles");
}

export default function SignupPage() {
  const actionData = useActionData<typeof action>();

  return <Signup actionData={actionData} />;
}
