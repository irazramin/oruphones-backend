export default abstract class RepositoryContract {

    abstract model: any;

    async getAll(conditions = {}) {
        return this.model.find(conditions);
    }

    async getById(id, query = {}) {
        return this.model.findOne({_id: id, ...query}).select('+password');
    }

    async create(data) {
        const model = new this.model(data);
        return model.save();
    }

    async createMany(data) {
        const res = this.model.insertMany(data);
        return res;
    }

    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new: true});
    }

    async updateMany(data) {
        const bulkWritePromises = data.map(async update => {
            if (update.id) {
                try {
                    const result = await this.update(update.id, update.item);
                    return { success: true, result };
                } catch (error) {
                    return { success: false, error };
                }
            } else {
                try {
                    const result = await this.create(update.item);
                    return { result };
                } catch ( error) {
                    return { error };
                }
            }
        });

        return await Promise.all(bulkWritePromises);
    }

}