module.exports = {
    connection: process.env.DB_CONNECTION || 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    database: process.env.DB_DATABASE || 'default',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password'
}