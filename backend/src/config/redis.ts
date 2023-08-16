module.exports = {
    family: parseInt(process.env.REDIS_FAMILY || '4'),
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
    database: process.env.REDIS_DATABASE || '0',
    password: process.env.REDIS_PASSWORD || 'secret',
    lazyConnect: process.env.REDIS_LAZY_CONNECT || 'true'
}