import TokenGenerator from 'src/appliaction/services/TokenGenerator';

export class TokenGeneratorMemory implements TokenGenerator {
  async generate(id: string, email: string, name: string): Promise<string> {
    return id.concat(email).concat(name);
  }
}
