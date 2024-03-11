import React from "react";

export default function Heading({
  className,
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={`w-fit ${className}`}>
      <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-border scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Make it work, then make it good.
      </h1>
    </div>
  );
}
