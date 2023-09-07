-- AlterTable
ALTER TABLE "storeModel" ADD COLUMN     "rating" INTEGER;

-- CreateTable
CREATE TABLE "commentModel" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeID" TEXT NOT NULL,

    CONSTRAINT "commentModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replyModel" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentID" TEXT NOT NULL,

    CONSTRAINT "replyModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commentModel" ADD CONSTRAINT "commentModel_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "storeModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replyModel" ADD CONSTRAINT "replyModel_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "commentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
