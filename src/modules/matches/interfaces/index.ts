import { ApiProperty } from '@nestjs/swagger';

export class GetTopLeaderboardResponse {
  @ApiProperty({
    description: 'Get top 50 users response',
    isArray: true,
    example: [
      {
        id: 2582,
        match_id: 1,
        user_id: 7728810,
        user_name: 'user_553172',
        position: 582,
        score: 7793,
        updated_at: '2024-01-04T22:12:52.840Z',
        created_at: '2024-01-04T22:12:52.840Z',
      },
      {
        id: 1582,
        match_id: 1,
        user_id: 9764645,
        user_name: 'user_869138',
        position: 582,
        score: 81,
        updated_at: '2024-01-04T22:11:27.008Z',
        created_at: '2024-01-04T22:11:27.008Z',
      },
      {
        id: 582,
        match_id: 1,
        user_id: 4618027,
        user_name: 'user_174602',
        position: 582,
        score: 6349,
        updated_at: '2024-01-04T21:40:39.430Z',
        created_at: '2024-01-04T21:40:39.430Z',
      },
      {
        id: 3582,
        match_id: 1,
        user_id: 1560704,
        user_name: 'user_885096',
        position: 582,
        score: 2740,
        updated_at: '2024-01-04T22:15:25.530Z',
        created_at: '2024-01-04T22:15:25.530Z',
      },
    ],
  })
  id: number;
  user_id: number;
  user_name: string;
  position: number;
  score: number;
  updated_at: Date;
  created_at: Date;
}

export class GetUserboardResponse {
  @ApiProperty({
    description: 'Get user surroundings response',
    isArray: true,
    example: [
      {
        id: 2582,
        match_id: 1,
        user_id: 7728810,
        user_name: 'user_553172',
        position: 582,
        score: 7793,
        updated_at: '2024-01-04T22:12:52.840Z',
        created_at: '2024-01-04T22:12:52.840Z',
      },
      {
        id: 1582,
        match_id: 1,
        user_id: 9764645,
        user_name: 'user_869138',
        position: 582,
        score: 81,
        updated_at: '2024-01-04T22:11:27.008Z',
        created_at: '2024-01-04T22:11:27.008Z',
      },
      {
        id: 582,
        match_id: 1,
        user_id: 4618027,
        user_name: 'user_174602',
        position: 582,
        score: 6349,
        updated_at: '2024-01-04T21:40:39.430Z',
        created_at: '2024-01-04T21:40:39.430Z',
      },
      {
        id: 3582,
        match_id: 1,
        user_id: 1560704,
        user_name: 'user_885096',
        position: 582,
        score: 2740,
        updated_at: '2024-01-04T22:15:25.530Z',
        created_at: '2024-01-04T22:15:25.530Z',
      },
    ],
  })
  id: number;
  user_id: number;
  user_name: string;
  position: number;
  score: number;
  updated_at: Date;
  created_at: Date;
}
