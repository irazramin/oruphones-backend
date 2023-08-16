import express from 'express'
import {config} from "../utils";

export default class Kernel {
    protected app: express.Application;

    createApp(): void {
        this.app = express();
    }

    listen(port: number | string = 3000): void {
        this.app.listen(port, (): void => {
            console.log(`Server is listen at ${port}`);
        });
    }

    getPort(): number | string {
        return config('app.port');
    }
}