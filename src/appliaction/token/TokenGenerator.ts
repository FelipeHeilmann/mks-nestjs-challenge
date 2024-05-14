export default interface TokenGenerator {
  generate(id: string, email: string, name: string): Promise<string>;
}
