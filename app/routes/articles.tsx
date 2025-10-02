import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "../../utils/prisma.server";
import { requireUserSession } from "../../utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  const articles = await prisma.article.findMany({
    where: { parentId: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      parentId: true,
      updatedAt: true,
    },
  });

  return json({ articles });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const articleId = formData.get("articleId") as string;

  if (articleId) {
    await prisma.article.delete({ where: { id: articleId } });
  }
  return redirect("/articles");
}

export default function Articles() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <Link
          to="/articles/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Article
        </Link>
      </div>

      {/* Articles table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2 w-[40%] font-medium text-gray-600">
                Title
              </th>
              {/* <th className="px-4 py-2 font-medium text-gray-600">Category</th> */}
              <th className="px-4 py-2 font-medium text-gray-600">Slug</th>
              <th className="px-4 py-2 font-medium text-gray-600">Preview</th>
              <th className="px-4 py-2 font-medium text-gray-600">Updated</th>
              <th className="px-4 py-2 text-right font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="h-24 text-center text-gray-500 italic"
                >
                  No articles found. Create your first article to get started.
                </td>
              </tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">
                    <div className="flex flex-col gap-1">
                      <span>{a.title}</span>
                      {a.parentId && (
                        <span className="text-xs text-gray-500">
                          Child article
                        </span>
                      )}
                    </div>
                  </td>
                  {/* <td className="px-4 py-2">
                    <span className="inline-block rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                      {a.category ?? "Uncategorized"}
                    </span>
                  </td> */}
                  <td className="px-4 py-2 font-mono text-sm text-gray-500">
                    /{a.slug}
                  </td>
                  <td className="px-4 py-2 max-w-xs text-sm text-gray-600">
                    <p className="truncate">{a.content}</p>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(a.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-right space-x-3">
                    <Link
                      to={`/preview/${a.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      Preview
                    </Link>
                    <Link
                      to={`/articles/${a.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <Form method="post" className="inline">
                      <input type="hidden" name="articleId" value={a.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* piginationation not properly implemented due to time constraints */}
      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div>{articles.length} Records</div>
        <div className="flex items-center gap-2">
          <span>Records per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span>Page 1 of 2</span>
          <button className="px-2">&lt;</button>
          <button className="px-2">&gt;</button>
        </div>
      </div>

      {/* nested routes (like /articles/new or /articles/:id/edit) */}
      <Outlet />
    </div>
  );
}
