-- DropForeignKey
ALTER TABLE "ShoesToTags" DROP CONSTRAINT "ShoesToTags_shoeId_fkey";

-- DropForeignKey
ALTER TABLE "ShoesToTags" DROP CONSTRAINT "ShoesToTags_tagId_fkey";

-- AlterTable
ALTER TABLE "ShoesToTags" ALTER COLUMN "tagId" DROP NOT NULL,
ALTER COLUMN "shoeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ShoesToTags" ADD CONSTRAINT "ShoesToTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoesToTags" ADD CONSTRAINT "ShoesToTags_shoeId_fkey" FOREIGN KEY ("shoeId") REFERENCES "Shoe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
