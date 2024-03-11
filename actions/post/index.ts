"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export const findAll = async () => {
  const post = await prisma.post.findMany();
  return post;
};

export const findMine = async (userId: string) => {
  const post = await prisma.post.findMany({
    where: { created_by: { id: userId } },
  });
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
    include: {
      comment: {
        include: {
          created_by: true,
          like: {
            select: { created_by: { select: { id: true } } },
          },
        },
      },
    },
  });
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

export const update = async (id: string, data: Prisma.PostUpdateInput) => {
  const post = await prisma.post.update({ where: { id }, data });

  return post;
};
