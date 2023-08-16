module.exports = {
    env: 'local',
    name: process.env.APP_NAME || 'Oruphones',
    version: process.env.APP_VERSION || 1.0,
    protocol: process.env.APP_PROTOCOL || 'http',
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3000,
    url: process.env.APP_URL || `${process.env.APP_PROTOCOL || 'http'}//${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT || 3000}`,
    connectTimeout: process.env.APP_CONNECT_TIMEOUT || 5,
    requestTimeout: process.env.APP_REQUEST_TIMEOUT || 15,
    lang: process.env.APP_LANG || 'en',
    secretKey: process.env.APP_SECRET_KEY || 'APP_SECRET_KEY'
}