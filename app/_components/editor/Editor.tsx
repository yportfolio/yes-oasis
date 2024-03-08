"use client";

import { update } from "@/actions/post";
import TitleEditor from "./TitleEditor";
import { debounce } from "@/lib/utils";
import React, { useState } from "react";
import Tiptap from "./Tiptap";

type IContentProps = {
  id: string;
  title: string;
  content: string;
  userId: string;
  created_by: string;
};

export default function Editor({
  id,
  title,
  content,
  userId,
  created_by,
}: IContentProps) {
  const [updating, setUpdating] = useState(false);

  // Function to handle editing
  const onTitleUpdate = async (title: string) => {
    setUpdating(true);
    await update(id as string, { title });

    setUpdating(false);
  };

  const onContentUpdate = async (content: string, summary: string) => {
    setUpdating(true);
    await update(id as string, { content, summary });

    setUpdating(false);
  };

  const debouncedOnTitleUpdate = debounce(onTitleUpdate, 1000);
  const debouncedOnContentUpdate = debounce(onContentUpdate, 1000);

  return (
    <div className="relative min-h-[600px]">
      <span
        className={`absolute right-0 ${!updating && "text-muted-foreground"}`}
      >
        {updating ? "updating..." : "saved"}
      </span>

      <TitleEditor title={title} editable onUpdate={debouncedOnTitleUpdate} />

      <Tiptap
        content={content}
        editable={userId === created_by}
        onUpdate={debouncedOnContentUpdate}
      />
    </div>
  );
}
