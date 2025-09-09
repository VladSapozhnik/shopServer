-- DropForeignKey
ALTER TABLE "public"."ratings" DROP CONSTRAINT "ratings_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
