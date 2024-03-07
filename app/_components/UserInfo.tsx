import { create } from "@/actions/user";
import { auth, currentUser } from "@clerk/nextjs";
import React from "react";

export default async function UserInfo() {
  const clerkUser = await currentUser();

  if (!clerkUser) return <div>not user signed in</div>;

  const user = await create({
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstname: clerkUser.firstName || "",
    lastname: clerkUser.lastName || "",
    avatar_url: clerkUser.imageUrl,
  });

  return <div className="overflow-clip">{JSON.stringify(user)}</div>;
}
