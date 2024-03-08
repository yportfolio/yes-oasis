"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const create = async (
  data: Omit<Prisma.CommentCreateInput, "created_by" | "created_for">,
  postId: string
) => {
  const userId = auth().userId;

  if (!userId) throw new Error("user not signed in");

  if (data.content.length <= 0)
    throw new Error("cannot summit a empty comment");

  const comment = await prisma.comment.create({
    data: {
      ...data,
      created_by: { connect: { id: userId } },
      created_for: { connect: { id: postId } },
    },
  });

  revalidatePath(`/${postId}`);

  return comment;
};

export const remove = async (id: string, postId: string) => {
  const userId = auth().userId;

  if (!userId) throw new Error("user not signed in");

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
    select: {
      created_by: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.created_by.id !== userId) {
    throw new Error("You are not the owner of this comment");
  }

  // Proceed with comment deletion if the current user is the owner
  await prisma.comment.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/${postId}`);

  return comment;
};
