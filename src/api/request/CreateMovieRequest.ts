import { ApiProperty } from '@nestjs/swagger';

export class MovieRequest {
  @ApiProperty({
    example: 'Spiderman 2',
  })
  name: string;

  @ApiProperty({
    example: 'Sam Raimi ',
  })
  director: string;

  @ApiProperty({
    example: 'Super Hero ',
  })
  genre: string;

  @ApiProperty({
    example: 2004,
  })
  year: number;

  @ApiProperty({
    example: 'Columbia Pictures',
  })
  studio: string;

  @ApiProperty({
    example: ['Tobey Maguire', 'Kirsten Dunst', 'James Franco'],
  })
  cast: string[];
}
