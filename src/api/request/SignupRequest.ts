import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignupRequest {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty({
    message: 'The name should not be empty',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty({
    message: 'The email should not be empty',
  })
  email: string;

  @ApiProperty({
    example: 'abc123456',
  })
  @IsNotEmpty({
    message: 'The password should not be empty',
  })
  password: string;
}
