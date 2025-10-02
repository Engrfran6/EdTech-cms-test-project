import { Form, Link } from "@remix-run/react";

export default function Signup({
  actionData,
}: {
  actionData?: { error?: string };
}) {
  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <Form method="post" className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </Form>
      {actionData?.error && (
        <p className="mt-4 text-red-600 text-center">{actionData.error}</p>
      )}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
