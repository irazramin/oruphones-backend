export default class CacheService {

    private client: any;
    constructor() {
        this.client = require('../connection/redis.connection');
    }

    async ping() {
        return await this.client.session.ping();
    }

    async keys(key: string) {
        return await this.client.session.keys(key);
    }

    async get(key: string) {
        return await this.client.session.get(key);
    }

    async save(key: string, value: string) {
        return await this.client.session.set(key, value);
    }

    async delete(key: any) {
        return await this.client.session.del(key);
    }

    async deleteByPatterns(patterns: Array<any>) {
        patterns.map(async (pattern) => {
            const keys = await this.client.session.keys(pattern);
            if (keys.length) {
                await this.client.session.del(keys);
            }
        })
    }

    getHashFromObject(obj: object) {
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(obj));

        return hash.digest('hex');
    }

}