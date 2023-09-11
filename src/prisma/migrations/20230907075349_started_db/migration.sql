/*
  Warnings:

  - A unique constraint covering the columns `[roleID]` on the table `authModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "storeModel" DROP CONSTRAINT "storeModel_userID_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "authModel_roleID_key" ON "authModel"("roleID");

-- AddForeignKey
ALTER TABLE "storeModel" ADD CONSTRAINT "storeModel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "authModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
