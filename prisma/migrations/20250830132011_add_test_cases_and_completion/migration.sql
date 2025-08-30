-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "estimatedTime" INTEGER NOT NULL,
    "languageId" TEXT NOT NULL,
    "testCases" TEXT,
    "solution" TEXT,
    "hints" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Lesson_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("content", "difficulty", "estimatedTime", "exercise", "id", "languageId", "number", "title") SELECT "content", "difficulty", "estimatedTime", "exercise", "id", "languageId", "number", "title" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
CREATE INDEX "Lesson_languageId_idx" ON "Lesson"("languageId");
CREATE UNIQUE INDEX "Lesson_languageId_number_key" ON "Lesson"("languageId", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
