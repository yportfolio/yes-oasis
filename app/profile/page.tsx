import { findMine } from "@/actions/post";
import { findOne } from "@/actions/user";
import PostList from "@/app/_components/PostList";
import SummaryCard from "@/app/_components/SummaryCard";
import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs";
import { CircleEllipsis } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function page() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>You need log in</div>;

  const user = await findOne(clerkUser.id);
  if (!user) return <div>No user in the db</div>;

  const posts = await findMine(user.id);
  return (
    <main className="container space-y-6">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            {/* TODO: get user info*/}
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {user.firstname} {user.lastname}
            </h1>
            <CircleEllipsis className="cursor-pointer" />
          </div>

          {posts.map((post) => (
            <SummaryCard post={post} key={post.id} />
          ))}
        </div>

        <div className="col-span-1 flex flex-col items-start">
          <Image
            src={user?.avatar_url || ""}
            width={120}
            height={120}
            alt="user img"
            className="rounded-full"
          />

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {user.firstname} {user.lastname}
          </h4>
          <p className="text-sm text-muted-foreground">
            {user.followed_by.length} Followers
          </p>

          <p className="text-sm text-muted-foreground">{user.bio}</p>

          <Button variant="link" className="p-0">
            Edit profile
          </Button>

          <p className="leading-7 [&:not(:first-child)]:mt-6">Following</p>

          {user.following.map((follow) => (
            <div
              key={follow.followed_by_id + follow.following_id}
              className="flex"
            >
              <Image
                src={follow.following.avatar_url}
                alt={follow.following.firstname}
                width={40}
                height={40}
              />
              {follow.following.firstname}
              {follow.following.lastname}
              <CircleEllipsis className="cursor-pointer" />
            </div>
          ))}

          <span>See all ({user.following.length})</span>
        </div>
      </div>
    </main>
  );
}
