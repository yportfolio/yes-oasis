import React from "react";
import Image from "next/image";
import NewPost from "@/app/_components/NewPost";

export default function Index() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome to your oasis</h2>
      <NewPost />
    </div>
  );
}
