/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `lessonId` on the `Progress` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Lesson_courseId_number_key";

-- DropIndex
DROP INDEX "Lesson_courseId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "courseId" TEXT,
    "examId" TEXT,
    "freestyleId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_freestyleId_fkey" FOREIGN KEY ("freestyleId") REFERENCES "Freestyle" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Progress" ("completed", "courseId", "createdAt", "examId", "freestyleId", "id", "updatedAt", "userId") SELECT "completed", "courseId", "createdAt", "examId", "freestyleId", "id", "updatedAt", "userId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
CREATE INDEX "Progress_userId_idx" ON "Progress"("userId");
CREATE INDEX "Progress_courseId_idx" ON "Progress"("courseId");
CREATE INDEX "Progress_examId_idx" ON "Progress"("examId");
CREATE INDEX "Progress_freestyleId_idx" ON "Progress"("freestyleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
