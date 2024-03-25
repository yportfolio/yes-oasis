import { findByIdWithComments } from "@/actions/post";
import { CommentArea } from "@/app/_components/CommentArea";
import Editor from "@/app/_components/editor/Editor";
import { Fallback } from "@/components/Fallback";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function Index({
  params,
}: {
  params: { "post-id": string };
}) {
  const post = await findByIdWithComments(params["post-id"]);

  if (!post) return <div>no post found</div>;

  const userId = auth().userId;

  if (!userId) return <div>you need login first</div>;

  return (
    <main className="container space-y-8">
      <Editor
        userId={userId}
        id={post.id}
        title={post.title}
        content={post.content}
        created_by={post.user_id}
        editable={true}
      />

      <div>
        <p className="text-sm text-muted-foreground">
          {`created at ${String(post.createdAt)}`}
        </p>

        <p className="text-sm text-muted-foreground">
          {`updated at ${String(post.updatedAt)}`}
        </p>
      </div>
    </main>
  );
}
