let bootstrapMongo: any = () => {
    const db = require('../app/connection/mongo.connection');

    db.once('open', () => {
       console.log('Mongo is connected');
    });
}

export default bootstrapMongo;