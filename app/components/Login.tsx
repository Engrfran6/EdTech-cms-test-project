import {Form, Link} from "@remix-run/react";

export default function Login({actionData}: {actionData?: {error?: string}}) {
  return (
    <>
      <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Form method="post" className="space-y-5">
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
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </Form>
        {actionData?.error && <p className="mt-4 text-red-600 text-center">{actionData.error}</p>}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="max-w-md mx-auto mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        For testing use:
        <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
          <li>Email: deulo.dev@gmail.com</li>
          <li>Password: Come1234</li>
        </ul>
      </div>
    </>
  );
}
