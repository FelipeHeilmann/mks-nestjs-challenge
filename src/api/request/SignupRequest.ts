import { PartialType } from '@nestjs/mapped-types';

class _signupRequest {
  name: string;
  email: string;
  password: string;
}

export class SignupRequest extends PartialType(_signupRequest) {}
