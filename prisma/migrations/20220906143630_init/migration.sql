-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "identifier_token" TEXT NOT NULL,
    "hashed_password" TEXT,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" SERIAL NOT NULL,
    "refresh_token" VARCHAR(320) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_identifier_token_key" ON "user"("identifier_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_id_key" ON "refresh_token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_refresh_token_key" ON "refresh_token"("refresh_token");

-- CreateIndex
CREATE INDEX "refresh_token_user_id_idx" ON "refresh_token"("user_id");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
