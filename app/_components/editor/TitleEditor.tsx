"use client";

import { update } from "@/actions/post";
import React from "react";

type TTitleEditor =
  | {
      title: string;
      editable: true;
      onUpdate: (title: string) => void;
    }
  | {
      title: string;
      editable?: false;
      onUpdate?: (title: string) => void;
    };

export default function TitleEditor({
  title,
  editable,
  onUpdate,
}: TTitleEditor) {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl border-0 outline-none"
      contentEditable={editable}
      onBlur={(e) => {
        const title = e.target.innerText;
        editable && onUpdate(title);
      }}
    >
      {title}
    </h1>
  );
}
