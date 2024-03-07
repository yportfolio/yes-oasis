"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const create = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({ where: { id: data.id } });

  if (!user) {
    user = await prisma.user.create({ data });
  }

  return user;
};
