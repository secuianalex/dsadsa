-- CreateTable
CREATE TABLE "Path" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PathLanguage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    CONSTRAINT "PathLanguage_pathId_fkey" FOREIGN KEY ("pathId") REFERENCES "Path" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PathLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Path_slug_key" ON "Path"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PathLanguage_pathId_languageId_key" ON "PathLanguage"("pathId", "languageId");
