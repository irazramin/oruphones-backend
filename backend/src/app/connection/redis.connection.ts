import {config} from "../utils";

const Redis = require("ioredis");

const options: object = {
    host: config('redis.host'),
    port: config('redis.port'),
    password: config('redis.password'),
    family: config('redis.family'),
    db: config('redis.database'),
    lazyConnect: config('redis.lazyConnect'),
    retryStrategy(times) {
        return Math.min(times * 50, 2000);
    },
};

const redis = {
    status: true,
    readiness: true,
    session: '',
    connection: ''
}

const session: any = new Redis(options);

let redisConnection: any = session.connect();
redis.session = session;
redis.connection = redisConnection;

session.on('connect', () => {
    console.log('Redis Connected')
    redis.status = true;
});

session.on('error', (err) => {
    console.log('Redis got error', err);
    redis.status = false;
});

session.on('end', () => {
    console.log('Redis end')
    redis.status = false;
});

module.exports = redis;