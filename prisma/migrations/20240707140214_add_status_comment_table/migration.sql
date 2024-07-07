-- CreateEnum
CREATE TYPE "ECommentStatus" AS ENUM ('NotApprove', 'Approved');

-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "status" "ECommentStatus" NOT NULL DEFAULT 'NotApprove';
