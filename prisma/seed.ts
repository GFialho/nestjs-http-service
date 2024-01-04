import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    // Seed matches
    await prisma.matches.create({
      data: {
        id: 1,
        title: 'Sample match',
      },
    });

    // Seed leaderboard
    const leaderboardData = [];
    for (let i = 1; i <= 1000; i++) {
      const score = Math.floor(Math.random() * 10000);
      const user_name = `user_${Math.floor(Math.random() * 1000000)}`;
      const user_id = Math.floor(Math.random() * 10000000);

      leaderboardData.push({
        user_id,
        user_name,
        position: i,
        score,
        match_id: 1,
      });
    }

    await prisma.leaderboard.createMany({
      data: leaderboardData,
    });

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
