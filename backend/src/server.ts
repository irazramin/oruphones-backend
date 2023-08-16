import Kernel from "./app/http/kernel";
import bootstrapMongo from "./bootstraps/mongo.bootstrap";
import redisBootstrap from "./bootstraps/redis.bootstrap";
import Middleware from "./app/http/middlewares/middleware";
import {v1Route} from "./routes/v1";
class Server extends Kernel {
    constructor() {
        super();
        this.run();
        this.registerMiddlewares().register();
        this.registerRoutes();
        bootstrapMongo();
        redisBootstrap();
    }
S
    run(): void {
        this.createApp();
        this.listen(this.getPort());
    }

    registerRoutes(): void {
        this.app.use('/api/v1', v1Route.router);
    }

    registerMiddlewares(): Middleware {
        return new Middleware(this.app);
    }
}

export default new Server()