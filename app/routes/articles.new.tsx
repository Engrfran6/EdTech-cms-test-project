import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {prisma} from "../../utils/prisma.server";

// Loader: fetch articles for parent selection
export async function loader() {
  const articles = await prisma.article.findMany({
    select: {id: true, title: true},
    orderBy: {createdAt: "asc"},
  });
  return json({articles});
}

// Action: create article
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string | null;

  if (!title || !slug) {
    return json({error: "Title and slug are required"}, {status: 400});
  }

  await prisma.article.create({
    data: {
      title,
      slug,
      content,
      parentId: parentId || null,
    },
  });

  return redirect("/articles");
}

export default function NewArticle() {
  const {articles} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create New Article</h1>

      <Form method="post" className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input type="text" name="slug" className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Parent */}
        <div>
          <label className="block text-sm font-medium">Parent Article</label>
          <select name="parentId" className="w-full border rounded px-3 py-2">
            <option value="">No parent (root)</option>
            {articles.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea name="content" className="w-full min-h-[50px] border rounded px-3 py-2" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
          Save
        </button>
      </Form>

      {actionData?.error && <p className="text-red-600 mt-2">{actionData.error}</p>}
    </div>
  );
}
