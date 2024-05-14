import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import TokenGenerator from 'src/appliaction/token/TokenGenerator';

@Injectable()
export class TokenGeneratorNestJS implements TokenGenerator {
  constructor(readonly jwtService: JwtService) {}
  async generate(id: string, email: string, name: string): Promise<string> {
    const payload = { sub: id, name, email };
    return await this.jwtService.signAsync(payload);
  }
}
