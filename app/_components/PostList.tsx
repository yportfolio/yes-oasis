import { findAll } from "@/actions/post";
import SummaryCard from "@/app/_components/SummaryCard";
import React from "react";

export default async function PostList({
  className,
}: React.ComponentPropsWithRef<"div">) {
  const posts = await findAll();
  return (
    <div className={className}>
      {posts.map((post) => (
        <SummaryCard post={post} key={post.id} />
      ))}
    </div>
  );
}
