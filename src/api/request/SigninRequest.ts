import { ApiProperty } from '@nestjs/swagger';

export class SigninRequest {
  @ApiProperty({
    example: 'John Doe',
  })
  email: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  password: string;
}
