/*
  Warnings:

  - Added the required column `userID` to the `commentModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commentModel" ADD COLUMN     "userID" TEXT NOT NULL;
