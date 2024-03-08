"use client";

import { update } from "@/actions/post";
import { debounce } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

type EditorProps =
  | {
      content: string;
      editable: true;
      onUpdate: (content: string, summary: string) => void;
    }
  | {
      content: string;
      editable?: false;
      onUpdate?: (content: string, summary: string) => void;
    };

const Tiptap = ({ content, editable = false, onUpdate }: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions: [StarterKit],
    content: JSON.parse(content),
    onUpdate({ editor }) {
      editable &&
        onUpdate &&
        onUpdate(JSON.stringify(editor.getJSON()), editor.getText());
    },
    editable,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
