-- CreateEnum
CREATE TYPE "UserRole" AS ENUM('ADMIN', 'USER', 'MODERATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "password" TEXT,
    "image" TEXT,


CONSTRAINT "User_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,


CONSTRAINT "Account_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,


CONSTRAINT "Artist_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,


CONSTRAINT "Genre_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "lyrics" JSONB NOT NULL,
    "title" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "story" TEXT,
    "nepaliLyrics" JSONB,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "artistId" TEXT,
    "userId" TEXT NOT NULL,


CONSTRAINT "Song_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,


CONSTRAINT "Comment_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "_GenreToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account" (
    "provider",
    "providerAccountId"
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre" ("name");

-- CreateIndex
CREATE INDEX "Song_songId_idx" ON "Song" ("songId");

-- CreateIndex
CREATE INDEX "Song_userId_idx" ON "Song" ("userId");

-- CreateIndex
CREATE INDEX "Song_artistId_idx" ON "Song" ("artistId");

-- CreateIndex
CREATE INDEX "Song_title_idx" ON "Song" ("title");

-- CreateIndex
CREATE INDEX "Comment_userId_idx" ON "Comment" ("userId");

-- CreateIndex
CREATE INDEX "Comment_songId_idx" ON "Comment" ("songId");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToSong_AB_unique" ON "_GenreToSong" ("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToSong_B_index" ON "_GenreToSong" ("B");

-- AddForeignKey
ALTER TABLE "Account"
ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song"
ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song"
ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong"
ADD CONSTRAINT "_GenreToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong"
ADD CONSTRAINT "_GenreToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE;