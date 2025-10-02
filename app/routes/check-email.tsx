import { Link, useSearchParams } from "@remix-run/react";

export default function CheckEmail() {
  const [params] = useSearchParams();
  const email = params.get("email");

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Your Email
        </h1>
        <p className="text-gray-600 mb-2">
          We&apos;ve sent a confirmation link to:
        </p>
        <p className="font-medium text-blue-600 break-all mb-4">{email}</p>
        <p className="text-gray-600">
          Please check your inbox or spam folder. Once confirmed, click{" "}
          <Link
            to="/articles"
            className="text-blue-600 underline underline-offset-4"
          >
            HERE
          </Link>{" "}
          and you&apos;ll be redirected to your{" "}
          <span className="font-semibold">Articles</span> page.
        </p>
      </div>
    </div>
  );
}
