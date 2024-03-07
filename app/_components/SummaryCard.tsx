"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";

import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

export default function SummaryCard({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <Card className="w-full">
      <CardHeader className="h-[40px] overflow-clip">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] overflow-clip">
        {post.summary}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => router.push(`${post.id}`)}>view</Button>
      </CardFooter>
    </Card>
  );
}
