-- CreateEnum
CREATE TYPE "AmountChargedBy" AS ENUM ('HOUR', 'DAY', 'MOUNTH', 'WORD');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('REDACTOR', 'PROGRAMMER', 'SEO_ESPECIALIST', 'BUSINESS', 'SITES_OPTIMIZATION', 'MARKETING');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "OccupationAreaProfile" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "occupation" "Occupation" NOT NULL,
    "portfolio" TEXT,
    "workValue" DOUBLE PRECISION NOT NULL,
    "amountChargedBy" "AmountChargedBy" NOT NULL,

    CONSTRAINT "OccupationAreaProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "nickName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OccupationAreaProfile.profileId_unique" ON "OccupationAreaProfile"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile.email_unique" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "OccupationAreaProfile" ADD CONSTRAINT "OccupationAreaProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
