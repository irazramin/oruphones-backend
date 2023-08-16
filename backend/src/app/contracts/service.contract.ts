import CacheService from "../services/cache.service";


export default abstract class ServiceContract {

    protected cacheService = new CacheService();

    abstract repository: any;

    abstract tag: string;

    abstract prepareConditions(query: any): any;

    async getAll(query = {}) {
        const conditions = this.prepareConditions(query);

        // let cacheKey = `${this.tag}:all:${this.cacheService.getHashFromObject(conditions)}`;
        // let data = await this.cacheService.get(cacheKey);
        let data  = await this.repository.getAll(conditions);

        // if (!data) {
        //     data = await this.repository.getAll(conditions);
        //     await this.cacheService.save(cacheKey, JSON.stringify(data));
        // } else {
        //     data = JSON.parse(data);
        // }

        return data;
    }
    async getById(id, query = {}) {

        // let data =  data = await this.repository.getById(id, query);
        let data = await this.repository.getById(id, query);

        // if (!data || data.length === 0) {
        //     data = await this.repository.getById(id, query);
        //     await this.cacheService.save(`${this.tag}:${id}`, JSON.stringify(data));
        // } else {
        //     data = JSON.parse(data);
        // }

        return data;
    }

    async create(data) {
        data = await this.repository.create(data);

        // await this.cacheService.save(`${this.tag}:${data._id}`, JSON.stringify(data));
        // await this.deleteAllAndListCache();

        return data;
    }

    async createMany(data) {
        data = await this.repository.createMany(data);

        // await this.cacheService.save(`${this.tag}:${data._id}`, JSON.stringify(data));
        // await this.deleteAllAndListCache();

        return data;
    }


    async update(id, data) {
        data = await this.repository.update(id, data);

        // await this.cacheService.save(`${this.tag}:${id}`, JSON.stringify(data));
        // await this.cacheService.deleteByPatterns([`${this.tag}:*`, `${this.tag}:all:*`]);

        return data;
    }

    async updateMany(data) {
        data = await this.repository.updateMany(data);
        return data;
    }
    async deleteAllAndListCache() {
        await this.cacheService.deleteByPatterns([`${this.tag}:*`, `${this.tag}:all:*`]);
    }
}

