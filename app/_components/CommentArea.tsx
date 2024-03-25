"use client";

import { create, remove } from "@/actions/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Comment, User } from "@prisma/client";
import { MoreHorizontal, ThumbsUp } from "lucide-react";
import { DropDownDelete } from "@/app/_components/DropDownDelete";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@clerk/nextjs";
import LikeButton from "@/app/_components/LikeButton";

type TCommentWithAuthor = Comment & { created_by: User } & {
  like: {
    created_by: {
      id: string;
    };
  }[];
};

type TCommentArea = { comments: TCommentWithAuthor[]; postId: string };
export function CommentArea({ comments, postId }: TCommentArea) {
  const [comment, setComment] = useState("");

  const { userId } = useAuth();

  const handleComment = async () => {
    await create(
      {
        content: comment,
      },
      postId
    );

    setComment("");
  };

  const deleteComment = async (id: string) => {
    await remove(id, postId);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">comment</Button>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Response {comments.length}</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2 shadow-lg p-4">
              <Label htmlFor="name" className="text-right" />

              <Textarea
                id="name"
                value={comment}
                className="col-span-3 border-0 focus-visible:ring-0 p-0"
                placeholder="What are your thoughts..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />

              <div className="flex justify-end space-x-2">
                <Button variant="ghost">Cancel</Button>
                <Button onClick={handleComment} disabled={comment.length <= 0}>
                  Response
                </Button>
              </div>
            </div>

            <div className="space-y-2 p-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={comment.created_by.avatar_url} />
                      <AvatarFallback>
                        {comment.created_by.firstname}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center items-start">
                      <div className="flex items-center space-x-1">
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                          {`${comment.created_by.firstname} ${comment.created_by.lastname}`}
                        </p>
                        {comment.created_by.id === userId && (
                          <Badge
                            variant="secondary"
                            className="text-muted-foreground"
                          >
                            you
                          </Badge>
                        )}
                      </div>
                      <small className="text-sm font-medium leading-none text-muted-foreground">
                        {comment.createdAt.toISOString()}
                      </small>
                    </div>

                    <DropDownDelete
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    />
                  </div>

                  <p>{comment.content}</p>

                  <LikeButton
                    commentId={comment.id}
                    like={comment.like}
                    postId={postId}
                  />
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
