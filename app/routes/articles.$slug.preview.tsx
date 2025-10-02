// app/routes/preview/$slug.tsx

import {LoaderFunctionArgs, json} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {prisma} from "../../utils/prisma.server";
import {requireUserSession} from "../../utils/session.server";

// Loader to fetch article by slug
export async function loader({request, params}: LoaderFunctionArgs) {
  await requireUserSession(request);

  const slug = params.slug;

  if (!slug) {
    throw new Response("Slug is required", {status: 400});
  }

  const article = await prisma.article.findUnique({
    where: {slug},
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      updatedAt: true,
      parentId: true,
    },
  });

  if (!article) {
    throw new Response("Article not found", {status: 404});
  }

  return json({article});
}

export default function ArticlePreview() {
  const {article} = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <Link
          to="/articles"
          className="text-sm text-blue-600 hover:underline bg-blue-100 px-3 py-1 rounded">
          ← Back to Articles
        </Link>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <span>Slug: /{article.slug}</span>
        <br />
        <span>
          Last updated:{" "}
          {new Date(article.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="prose max-w-none">
        <p>{article.content}</p>
      </div>

      {article.parentId && (
        <p className="mt-4 text-xs italic text-gray-500">This is a child article.</p>
      )}
    </div>
  );
}
