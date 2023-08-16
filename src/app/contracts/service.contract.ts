export default abstract class ServiceContract {

    abstract repository: any;

    abstract tag: string;

    abstract prepareConditions(query: any): any;

    async getAll(query = {}) {
        const conditions = this.prepareConditions(query);

        let data  = await this.repository.getAll(conditions);

        return data;
    }
    async getById(id, query = {}) {

        let data = await this.repository.getById(id, query);


        return data;
    }

    async create(data) {
        data = await this.repository.create(data);

        return data;
    }

    async createMany(data) {
        data = await this.repository.createMany(data);

        return data;
    }


    async update(id, data) {
        data = await this.repository.update(id, data);

        return data;
    }

    async updateMany(data) {
        data = await this.repository.updateMany(data);
        return data;
    }

}

