/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Freestyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `courseId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `freestyleId` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `lessonId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_levelId_idx";

-- DropIndex
DROP INDEX "Freestyle_levelId_key";

-- DropIndex
DROP INDEX "Level_languageId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Course";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Freestyle";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Level";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "estimatedTime" INTEGER NOT NULL,
    "languageId" TEXT NOT NULL,
    CONSTRAINT "Lesson_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exam" ("id", "prompt") SELECT "id", "prompt" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
CREATE UNIQUE INDEX "Exam_lessonId_key" ON "Exam"("lessonId");
CREATE TABLE "new_Progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "lessonId" TEXT,
    "examId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Progress" ("completed", "createdAt", "examId", "id", "updatedAt", "userId") SELECT "completed", "createdAt", "examId", "id", "updatedAt", "userId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
CREATE INDEX "Progress_userId_idx" ON "Progress"("userId");
CREATE INDEX "Progress_lessonId_idx" ON "Progress"("lessonId");
CREATE INDEX "Progress_examId_idx" ON "Progress"("examId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Lesson_languageId_idx" ON "Lesson"("languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_languageId_number_key" ON "Lesson"("languageId", "number");
