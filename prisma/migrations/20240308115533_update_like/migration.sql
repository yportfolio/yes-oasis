/*
  Warnings:

  - You are about to drop the column `entity_id` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `entity_type` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "entity_id",
DROP COLUMN "entity_type";
