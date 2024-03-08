import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";

export default function LikeButton() {
  const [effect, setEffect] = useState(false);

  return (
    <Button
      variant="ghost"
      className={`${effect && "animate-wiggle"} p-0 m-0 hover:bg-transparent `}
      onClick={() => setEffect(true)}
      onAnimationEnd={() => setEffect(false)}
    >
      <ThumbsUp />
    </Button>
  );
}
