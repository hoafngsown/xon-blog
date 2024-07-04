/*
  Warnings:

  - You are about to drop the column `categoryId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `post_tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "post_tag" DROP CONSTRAINT "post_tag_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_tag" DROP CONSTRAINT "post_tag_tagId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "categoryId",
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "post_tag";

-- DropTable
DROP TABLE "tag";

-- CreateTable
CREATE TABLE "post_category" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
