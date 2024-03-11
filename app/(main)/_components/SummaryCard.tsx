"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import React from "react";

import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { Ban, BookmarkCheck, CircleEllipsis } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function SummaryCard({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <Card className="w-full shadow-none border-none">
      <CardHeader className="h-[40px] overflow-clip p-0">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] overflow-clip p-0">
        {post.summary}
      </CardContent>

      <CardFooter className="flex justify-end space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <BookmarkCheck className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Ban className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Show less like this</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleEllipsis className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>More</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
