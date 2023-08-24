-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Hit_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Hit" ("date", "id", "ownerId") SELECT "date", "id", "ownerId" FROM "Hit";
DROP TABLE "Hit";
ALTER TABLE "new_Hit" RENAME TO "Hit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
