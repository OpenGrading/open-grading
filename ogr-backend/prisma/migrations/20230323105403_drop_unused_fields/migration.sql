/*
  Warnings:

  - You are about to drop the column `data` on the `ReviewTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `questions_count` on the `ReviewTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReviewTemplate" DROP COLUMN "data",
DROP COLUMN "questions_count";
