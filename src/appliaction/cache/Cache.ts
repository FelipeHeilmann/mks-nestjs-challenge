export default interface Cache {
  getValue(key: string): Promise<any | undefined>;
  setValue(key: string, value: any, expiresInSeconds?: number): Promise<void>;
  deleteValue(key: string): Promise<void>;
}
