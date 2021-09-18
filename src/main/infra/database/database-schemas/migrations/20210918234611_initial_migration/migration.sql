-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "imageUrl" VARCHAR(1024),
    "password" VARCHAR(128) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
