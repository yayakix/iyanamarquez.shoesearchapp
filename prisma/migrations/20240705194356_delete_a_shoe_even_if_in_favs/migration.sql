-- DropForeignKey
ALTER TABLE "UsersToShoesFavorites" DROP CONSTRAINT "UsersToShoesFavorites_shoeId_fkey";

-- AddForeignKey
ALTER TABLE "UsersToShoesFavorites" ADD CONSTRAINT "UsersToShoesFavorites_shoeId_fkey" FOREIGN KEY ("shoeId") REFERENCES "Shoe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
