import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninRequest {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty({
    message: 'The email should not be empty',
  })
  email: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty({
    message: 'The password should not be empty',
  })
  password: string;
}
