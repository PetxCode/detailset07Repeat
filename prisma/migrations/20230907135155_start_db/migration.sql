-- DropForeignKey
ALTER TABLE "commentModel" DROP CONSTRAINT "commentModel_storeID_fkey";

-- DropForeignKey
ALTER TABLE "replyModel" DROP CONSTRAINT "replyModel_commentID_fkey";

-- DropForeignKey
ALTER TABLE "storeModel" DROP CONSTRAINT "storeModel_userID_fkey";

-- AddForeignKey
ALTER TABLE "storeModel" ADD CONSTRAINT "storeModel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "authModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentModel" ADD CONSTRAINT "commentModel_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "storeModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replyModel" ADD CONSTRAINT "replyModel_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "commentModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
