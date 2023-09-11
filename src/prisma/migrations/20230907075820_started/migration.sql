-- DropForeignKey
ALTER TABLE "storeModel" DROP CONSTRAINT "storeModel_userID_fkey";

-- AddForeignKey
ALTER TABLE "storeModel" ADD CONSTRAINT "storeModel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "authModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
