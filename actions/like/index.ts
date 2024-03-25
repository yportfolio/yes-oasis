"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const findAll = async () => {
  const post = await prisma.post.findMany();
  return post;
};

export const findById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
};

export const findByIdWithComments = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { comment: { include: { created_by: true } } },
  });
  return post;
};

type TLikeCreate = {
  commentId: string;
  postId: string;
};

export const create = async ({ commentId, postId }: TLikeCreate) => {
  const userId = auth().userId;

  if (!userId) throw new Error("user not signed in");

  const like = await prisma.like.create({
    data: {
      comment: { connect: { id: commentId } },
      created_by: { connect: { id: userId } },
    },
  });

  revalidatePath(`/public/${postId}`);

  return like;
};

export const update = async (id: string, data: Prisma.PostUpdateInput) => {
  const post = await prisma.post.update({ where: { id }, data });

  return post;
};
