import { findById } from "@/actions/post";
import React from "react";

export default async function Index({
  params,
}: {
  params: { "post-id": string };
}) {
  const post = await findById(params["post-id"]);

  if (!post) return <div>no post found</div>;
  return (
    <main className="container">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {post.title}
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-6">{post.content}</p>

      <div>
        <p className="text-sm text-muted-foreground">
          {String(post.createdAt)}
        </p>

        <p className="text-sm text-muted-foreground">
          {String(post.updatedAt)}
        </p>
      </div>
    </main>
  );
}
