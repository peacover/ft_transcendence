-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "first_time" BOOLEAN NOT NULL,
    "username" TEXT NOT NULL,
    "is_two_fa_enable" BOOLEAN NOT NULL,
    "two_fa_code" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
