import fs from 'fs';
import path from 'path';
import { sessionUserAction, sessionType} from './getSectionAction';


type CacheContent = {
  ttl: number;
  content: any;
};

type UserCache = {
  [key: string]: CacheContent;
};

type CacheStore = {
  [userId: string]: UserCache;
};

export const schemaCache={
    prompts:'prompt'
}

class Cache {
  minutos: number = 10;
  arquivo = 'cacheSave.json';
  private TTL = this.minutos * 60 * 1000;
  private path: string = path.join(process.cwd(), 'cache', 'cacheStore', this.arquivo);
  private sessionUser: sessionType | null = null;

  constructor() {
    this.check();
  }

  private dataTime() {
    return Date.now();
  }

  private load(): CacheStore {
    try {
      const data = fs.readFileSync(this.path, { encoding: 'utf-8' });
      return JSON.parse(data) as CacheStore;
    } catch (error) {
      return {};
    }
  }

  private saveToFile(data: CacheStore) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
  }

  async check() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(path.dirname(this.path), { recursive: true });
      fs.writeFileSync(this.path, JSON.stringify({}, null, 2), { encoding: 'utf-8' });
    }
    this.sessionUser = await sessionUserAction();
  }

  async set(key: string, content: any) {
    await this.check();
    const cache = this.load();
    const userId = this.sessionUser!.id;

    if (!cache[userId]) cache[userId] = {};

    cache[userId][key] = {
      ttl: this.dataTime() + this.TTL,
      content,
    };

    this.saveToFile(cache);
  }

  async get<T = any>(key: string): Promise<T | null> {
    await this.check();
    const cache = this.load();
    const userId = this.sessionUser!.id;

    const item = cache[userId]?.[key];
    if (!item) return null;

    if (this.dataTime() > item.ttl) {
      // Expirado
      await this.delete(key);
      return null;
    }

    return item.content as T;
  }

  async getOrSet<T = any>(key: string, fallbackFn: () => Promise<T>): Promise<T> {
    await this.check();
    const cache = this.load();
    const userId = this.sessionUser!.id;
  
    const item = cache[userId]?.[key];
    const now = this.dataTime();
    
    
    if ((item && item.content) && now <= item.ttl) {
      return item.content as T;
    }
  
    const content = await fallbackFn();
  
    if (!cache[userId]) cache[userId] = {};
  
    cache[userId][key] = {
      ttl: now + this.TTL,
      content,
    };
  
    this.saveToFile(cache);
    return content;
  }

  async update(key: string, newContent: any) {
    await this.check();
    const existing = await this.get(key);
    if (!existing) return;

    await this.set(key, newContent);
  }

  async delete(key: string) {
    await this.check();
    const cache = this.load();
    const userId = this.sessionUser!.id;

    if (cache[userId] && cache[userId][key]) {
      delete cache[userId][key];
      this.saveToFile(cache);
    }
  }
}

export default Cache;
