/*
  Warnings:

  - Added the required column `questions_count` to the `ReviewTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewTemplate" ADD COLUMN     "questions_count" INTEGER NOT NULL;
