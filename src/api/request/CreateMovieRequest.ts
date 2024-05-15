import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MovieRequest {
  @ApiProperty({
    example: 'Spiderman 2',
  })
  @IsNotEmpty({
    message: 'The name should not be empty',
  })
  name: string;

  @ApiProperty({
    example: 'Sam Raimi ',
  })
  @IsNotEmpty({
    message: 'The director should not be empty',
  })
  director: string;

  @ApiProperty({
    example: 'Super Hero ',
  })
  @IsNotEmpty({
    message: 'The genre should not be empty',
  })
  genre: string;

  @ApiProperty({
    example: 2004,
  })
  @IsNotEmpty({
    message: 'The year should not be empty',
  })
  year: number;

  @ApiProperty({
    example: 'Columbia Pictures',
  })
  @IsNotEmpty({
    message: 'The studio should not be empty',
  })
  studio: string;

  @ApiProperty({
    example: ['Tobey Maguire', 'Kirsten Dunst', 'James Franco'],
  })
  @IsNotEmpty({
    message: 'The cast should not be empty',
  })
  cast: string[];
}
