/*
  Warnings:

  - You are about to drop the `Basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasketDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrandType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeviceInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Basket" DROP CONSTRAINT "Basket_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketDevice" DROP CONSTRAINT "BasketDevice_basketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BasketDevice" DROP CONSTRAINT "BasketDevice_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BrandType" DROP CONSTRAINT "BrandType_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BrandType" DROP CONSTRAINT "BrandType_typeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_typeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeviceInfo" DROP CONSTRAINT "DeviceInfo_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropTable
DROP TABLE "public"."Basket";

-- DropTable
DROP TABLE "public"."BasketDevice";

-- DropTable
DROP TABLE "public"."Brand";

-- DropTable
DROP TABLE "public"."BrandType";

-- DropTable
DROP TABLE "public"."Device";

-- DropTable
DROP TABLE "public"."DeviceInfo";

-- DropTable
DROP TABLE "public"."Rating";

-- DropTable
DROP TABLE "public"."Type";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."baskets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "baskets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."basket_devices" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "basketId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "basket_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."device_infos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "device_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."brand_types" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "brand_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ratings" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "public"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "baskets_id_key" ON "public"."baskets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "baskets_userId_key" ON "public"."baskets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "basket_devices_id_key" ON "public"."basket_devices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "basket_devices_basketId_deviceId_key" ON "public"."basket_devices"("basketId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "devices_id_key" ON "public"."devices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "devices_name_key" ON "public"."devices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "device_infos_id_key" ON "public"."device_infos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "device_infos_title_key" ON "public"."device_infos"("title");

-- CreateIndex
CREATE UNIQUE INDEX "device_infos_deviceId_key" ON "public"."device_infos"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "brands_id_key" ON "public"."brands"("id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "public"."brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "types_id_key" ON "public"."types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "public"."types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brand_types_id_key" ON "public"."brand_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_types_brandId_typeId_key" ON "public"."brand_types"("brandId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_id_key" ON "public"."ratings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_deviceId_userId_key" ON "public"."ratings"("deviceId", "userId");

-- AddForeignKey
ALTER TABLE "public"."baskets" ADD CONSTRAINT "baskets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."basket_devices" ADD CONSTRAINT "basket_devices_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."baskets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."basket_devices" ADD CONSTRAINT "basket_devices_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devices" ADD CONSTRAINT "devices_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devices" ADD CONSTRAINT "devices_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."device_infos" ADD CONSTRAINT "device_infos_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."brand_types" ADD CONSTRAINT "brand_types_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."brand_types" ADD CONSTRAINT "brand_types_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
