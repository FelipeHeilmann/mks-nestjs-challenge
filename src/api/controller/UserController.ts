import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Signup } from 'src/appliaction/usecase/Signup';
import { SignupRequest } from '../request/SignupRequest';
import { Signin } from 'src/appliaction/usecase/Signin';
import { SigninRequest } from '../request/SigninRequest';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(
    private readonly signup: Signup,
    private readonly signin: Signin,
  ) {}

  @HttpCode(201)
  @Post('signup')
  async register(@Body() request: SignupRequest) {
    const input = {
      name: request.name,
      email: request.email,
      password: request.password,
    };
    return await this.signup.execute(input);
  }

  @HttpCode(200)
  @Post('auth')
  async auth(@Body() request: SigninRequest) {
    const input = {
      email: request.email,
      password: request.password,
    };
    return await this.signin.execute(input);
  }
}
