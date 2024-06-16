-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "lat" TEXT,
    "lng" TEXT,
    "name" TEXT,
    "category" TEXT,
    "storeType" TEXT,
    "foodCertifyName" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);
