/*
  Warnings:

  - You are about to drop the `ReviewTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "grade_system_type" AS ENUM ('SINGLE_GRADE', 'MULTIPLE_GRADES');

-- DropTable
DROP TABLE "ReviewTemplate";

-- CreateTable
CREATE TABLE "grade_system" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "grade_system_variant_id" INTEGER NOT NULL,

    CONSTRAINT "grade_system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_system_variant" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "type" "grade_system_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "grade_system_id" INTEGER NOT NULL,

    CONSTRAINT "grade_system_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "level" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "grade_system_id" INTEGER NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grade_system_grade_system_variant_id_key" ON "grade_system"("grade_system_variant_id");

-- AddForeignKey
ALTER TABLE "grade_system" ADD CONSTRAINT "grade_system_grade_system_variant_id_fkey" FOREIGN KEY ("grade_system_variant_id") REFERENCES "grade_system_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_system_variant" ADD CONSTRAINT "grade_system_variant_grade_system_id_fkey" FOREIGN KEY ("grade_system_id") REFERENCES "grade_system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_grade_system_id_fkey" FOREIGN KEY ("grade_system_id") REFERENCES "grade_system_variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
