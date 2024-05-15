import { ApiProperty } from '@nestjs/swagger';

export class SignupRequest {
  @ApiProperty({
    example: 'John Doe',
  })
  @ApiProperty()
  name: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'abc123456',
  })
  password: string;
}
