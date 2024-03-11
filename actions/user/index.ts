"use server";
import prisma from "@/lib/db";
import { Prisma, User } from "@prisma/client";

export const create = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.upsert({
    where: { id: data.id },
    create: { ...data },
    update: { ...data },
  });

  return user;
};

export const findOne = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      following: { include: { following: true } },
      followed_by: true,
    },
  });
};
