import {Application} from "express";
import body_parser from "body-parser";
import cors from "cors";
import session from 'express-session';
import {Passport} from "../../utils/password";

const cookieParser = require('cookie-parser');

class Middleware {

    protected app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public register() {
        Passport.init();

        this.app.use(
            cookieParser(),
            cors({
                origin: ['http://localhost:3000', "http://localhost:3000"],
                credentials: true
            }),
            body_parser.urlencoded({extended: false}),
            body_parser.json()
        );

        this.app.use(session({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: false
        }));

        this.app.use(Passport.initialize());
        this.app.use(Passport.session());
    }

}

export default Middleware;