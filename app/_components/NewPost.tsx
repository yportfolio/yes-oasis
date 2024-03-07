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
      title: "",
      content: "",
      summary: "",
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
