/*
  Warnings:

  - You are about to drop the column `category_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_category_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "Category";
