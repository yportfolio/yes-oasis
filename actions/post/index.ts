"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export const findAll = async () => {
  const post = await prisma.post.findMany();
  return post;
};

export const findById = async (id: string) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

export const create = async (
  data: Omit<Prisma.PostCreateInput, "created_by">
) => {
  const id = auth().userId;

  if (!id) throw new Error("user not signed in");

  const post = await prisma.post.create({
    data: {
      ...data,
      created_by: { connect: { id } },
    },
  });

  return post;
};
