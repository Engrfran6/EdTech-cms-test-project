import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, useActionData, useLoaderData} from "@remix-run/react";
import {prisma} from "../../utils/prisma.server";

export async function loader({params}: {params: {id: string}}) {
  const article = await prisma.article.findUnique({
    where: {id: params.id},
  });
  const articles = await prisma.article.findMany({
    select: {id: true, title: true, content: true},
    orderBy: {createdAt: "asc"},
  });
  return json({article, articles});
}

export async function action({request, params}: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string | null;

  try {
    await prisma.article.update({
      where: {id: params.id},
      data: {
        title,
        slug,
        content,
        parentId: parentId || null,
      },
    });
    return redirect("/articles");
  } catch (error: any) {
    return json({error: error.message || "Failed to update article."});
  }
}

export default function EditArticle() {
  const {article, articles} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Article</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={article.title}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            defaultValue={article.slug}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Parent Article</label>
          <select
            name="parentId"
            defaultValue={article.parentId ?? ""}
            className="w-full border rounded px-3 py-2">
            <option value="">No parent (root)</option>
            {articles.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            defaultValue={article.content}
            className="w-full min-h-[50px] border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
          Update
        </button>
      </Form>
      {actionData?.error && <p className="text-red-600 mt-2">{actionData.error}</p>}
    </div>
  );
}
