import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "../../utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");

  if (!access_token || !refresh_token) {
    return redirect("/?error=invalid-confirmation");
  }

  const session = await getSession(request);
  session.set("access_token", access_token);
  session.set("refresh_token", refresh_token);

  return redirect("/articles", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
