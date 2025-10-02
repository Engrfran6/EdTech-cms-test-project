import { Link } from "@remix-run/react";

export type Article = {
  id: string;
  title: string;
  children?: Article[]; // ✅ make optional
};

export default function ArticleTree({ articles }: { articles: Article[] }) {
  return (
    <ul className="ml-4 list-disc">
      {articles.map((a) => (
        <li key={a.id}>
          <Link
            to={`/articles/${a.id}/edit`}
            className="text-blue-600 hover:underline"
          >
            {a.title}
          </Link>
          {a.children && a.children.length > 0 && (
            <ArticleTree articles={a.children} />
          )}
        </li>
      ))}
    </ul>
  );
}
