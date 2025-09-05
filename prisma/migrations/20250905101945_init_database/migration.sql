-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Basket" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BasketDevice" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "basketId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "BasketDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DeviceInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "DeviceInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BrandType" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "BrandType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_id_key" ON "public"."Basket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_userId_key" ON "public"."Basket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BasketDevice_id_key" ON "public"."BasketDevice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BasketDevice_basketId_deviceId_key" ON "public"."BasketDevice"("basketId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_id_key" ON "public"."Device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "public"."Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_typeId_key" ON "public"."Device"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_brandId_key" ON "public"."Device"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceInfo_id_key" ON "public"."DeviceInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceInfo_title_key" ON "public"."DeviceInfo"("title");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceInfo_deviceId_key" ON "public"."DeviceInfo"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "public"."Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "public"."Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_id_key" ON "public"."Type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "public"."Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BrandType_id_key" ON "public"."BrandType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BrandType_brandId_typeId_key" ON "public"."BrandType"("brandId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "public"."Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_deviceId_userId_key" ON "public"."Rating"("deviceId", "userId");

-- AddForeignKey
ALTER TABLE "public"."Basket" ADD CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BasketDevice" ADD CONSTRAINT "BasketDevice_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "public"."Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BasketDevice" ADD CONSTRAINT "BasketDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Device" ADD CONSTRAINT "Device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Device" ADD CONSTRAINT "Device_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeviceInfo" ADD CONSTRAINT "DeviceInfo_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BrandType" ADD CONSTRAINT "BrandType_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BrandType" ADD CONSTRAINT "BrandType_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "public"."Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
