import express from 'express'
import * as http from "http";
export default class Kernel {
    protected app: express.Application;

    createApp(): void {
        this.app = express();
    }

    listen(port: number | string = 4000): void {
        this.app.listen(port, (): void => {
            console.log(`Server is listen at ${port}`);
        });
    }

    getPort(): number | string {
        return 4000;
    }
}