/*
  Warnings:

  - A unique constraint covering the columns `[match_id,position]` on the table `leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_match_id_position_key" ON "leaderboard"("match_id", "position");
