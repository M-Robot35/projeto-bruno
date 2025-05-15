

// import Redis from "ioredis";
// import { sessionUserAction, sessionType } from "@/app/actions/getSectionAction";


// const redis = new Redis();// instalar o redis

// class CacheRedis {
//   minutos = 5;
//   private TTL = this.minutos * 60; // em segundos
//   private sessionUser: sessionType | null = null;

//   constructor() {}

//   async check() {
//     this.sessionUser = await sessionUserAction();
//   }

//   private getRedisKey(key: string) {
//     return `user:${this.sessionUser!.id}:${key}`;
//   }

//   async getOrSet<T = any>(key: string, fallbackFn: () => Promise<T>): Promise<T> {
//     await this.check();
//     const redisKey = this.getRedisKey(key);

//     const cached = await redis.get(redisKey);
//     if (cached) {
//       return JSON.parse(cached) as T;
//     }

//     const data = await fallbackFn();
//     await redis.set(redisKey, JSON.stringify(data), 'EX', this.TTL);
//     return data;
//   }

//   async delete(key: string) {
//     await this.check();
//     await redis.del(this.getRedisKey(key));
//   }
// }