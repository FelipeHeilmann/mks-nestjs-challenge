import { Injectable } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import Cache from 'src/appliaction/cache/Cache';

@Injectable()
export class RedisCache extends Redis implements Cache {
  constructor() {
    const options: RedisOptions = {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    };

    super(options);

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
    expiresInSeconds: number = 60,
  ): Promise<void> {
    await this.set(key, JSON.stringify(value), 'EX', expiresInSeconds);
  }

  async deleteValue(key: string) {
    await this.del(key);
  }
}
