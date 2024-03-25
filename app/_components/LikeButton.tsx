import { create } from "@/actions/like";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";

type TLikeButton = {
  commentId: string;
  postId: string;
  like: {
    created_by: {
      id: string;
    };
  }[];
};

export default function LikeButton({ commentId, like, postId }: TLikeButton) {
  const [effect, setEffect] = useState(false);
  const { userId } = useAuth();

  const onLikeComment = async () => {
    await create({ commentId, postId });
  };

  return (
    <>
      <Button
        variant="ghost"
        className={`${
          effect && "animate-wiggle"
        } p-0 m-0 hover:bg-transparent `}
        onClick={async () => {
          await onLikeComment();
          setEffect(true);
        }}
        onAnimationEnd={() => setEffect(false)}
      >
        {like.find((like) => like.created_by.id === userId) ? (
          <span>liked</span>
        ) : (
          <ThumbsUp />
        )}
      </Button>
      <span>{like.length}</span>
    </>
  );
}
