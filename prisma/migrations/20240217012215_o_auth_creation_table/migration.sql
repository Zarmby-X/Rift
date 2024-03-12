-- CreateTable
CREATE TABLE "OAuth" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "providerId" INTEGER,
    "email" TEXT,
    "provider" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    CONSTRAINT "OAuth_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
