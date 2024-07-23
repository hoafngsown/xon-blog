-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('Image', 'Video');

-- AlterTable
ALTER TABLE "image" ADD COLUMN     "type" "MediaType" NOT NULL DEFAULT 'Image';
