import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Cache from 'src/appliaction/cache/Cache';

@Injectable()
export class RedisCache extends Redis implements Cache {
  constructor() {
    super();

    super.on('error', (err) => {
      console.log('Error on redis');
      console.log(err);
    });
  }

  async getValue(key: string): Promise<any> {
    return JSON.parse(await this.get(key));
  }

  async setValue(
    key: string,
    value: any,
    expiresInSeconds: number = 120,
  ): Promise<void> {
    await this.set(key, JSON.stringify(value), 'EX', expiresInSeconds);
  }
}
