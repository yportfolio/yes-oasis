"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export const create = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.upsert({
    where: { id: data.id },
    create: { ...data },
    update: { ...data },
  });

  return user;
};
