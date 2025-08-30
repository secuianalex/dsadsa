-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "courseId" TEXT,
    "lessonId" TEXT,
    "examId" TEXT,
    "freestyleId" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Progress_freestyleId_fkey" FOREIGN KEY ("freestyleId") REFERENCES "Freestyle" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Progress" ("completed", "courseId", "createdAt", "examId", "freestyleId", "id", "updatedAt", "userId") SELECT "completed", "courseId", "createdAt", "examId", "freestyleId", "id", "updatedAt", "userId" FROM "Progress";
DROP TABLE "Progress";
ALTER TABLE "new_Progress" RENAME TO "Progress";
CREATE INDEX "Progress_userId_idx" ON "Progress"("userId");
CREATE INDEX "Progress_courseId_idx" ON "Progress"("courseId");
CREATE INDEX "Progress_lessonId_idx" ON "Progress"("lessonId");
CREATE INDEX "Progress_examId_idx" ON "Progress"("examId");
CREATE INDEX "Progress_freestyleId_idx" ON "Progress"("freestyleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Lesson_courseId_idx" ON "Lesson"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_courseId_number_key" ON "Lesson"("courseId", "number");
