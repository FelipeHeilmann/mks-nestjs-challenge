import { PartialType } from '@nestjs/mapped-types';

class _signinRequest {
  name: string;
  email: string;
  password: string;
}

export class SigninRequest extends PartialType(_signinRequest) {}
