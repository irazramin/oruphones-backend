let bootstrapRedis: any = () => {
    const redis = require('../app/connection/redis.connection');

    redis.session.on('ready', () => {
        console.log('Redis Connected')
        redis.status = true;
    });
}

export default bootstrapRedis;