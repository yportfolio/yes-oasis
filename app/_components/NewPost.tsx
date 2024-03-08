"use client";
import { create } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewPost() {
  const router = useRouter();

  const onCreate = async () => {
    const post = await create({
      title: "Write your title here",
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Empty area..." }],
          },
        ],
      }),
      summary: "This is a brand new article...",
    });

    router.push(`${post.id}`);
  };

  return (
    <Button onClick={onCreate}>
      <PlusCircle className="h-4 w-4 mr-2" />
      Create a note
    </Button>
  );
}
