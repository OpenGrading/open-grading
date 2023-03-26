-- DropForeignKey
ALTER TABLE "grade_system_variant" DROP CONSTRAINT "grade_system_variant_grade_system_id_fkey";

-- AlterTable
ALTER TABLE "grade_system_variant" ALTER COLUMN "grade_system_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "grade_system_variant" ADD CONSTRAINT "grade_system_variant_grade_system_id_fkey" FOREIGN KEY ("grade_system_id") REFERENCES "grade_system"("id") ON DELETE SET NULL ON UPDATE CASCADE;
