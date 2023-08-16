import {Request, Response} from "express";
import {config} from "../../utils";
import CacheService from "../../services/cache.service";
import {UserService} from "../../services";
const passport = require('passport');
const jwt = require('jsonwebtoken');

export default class AuthController {
    private cacheKey = "token";
    private cacheService = new CacheService();
    private userService = new UserService();

    login = async (req: Request, res: Response, next: any) => {

        passport.authenticate('local', {session: false}, async (error, user) => {

            if (!config('app.secretKey').length) {
                return res.status(422)
                    .send({message: "Application secret key not found!"});
            }

            if (error || !user) {
                return res.status(422)
                    .send({message: "Invalid user credentials. Please provide a valid email or password."});
            }

            const payload = {
                _id: user._id,
                firstName: user?.firstName ?? "",
                lastName: user?.lastName ?? "",
                email: user?.email ?? "",
                about: user?.about ?? "",
                image: user?.image ?? "",
            }

            const token = jwt.sign(payload, config('app.secretKey'), {expiresIn: "1d"});

            const data = {
                access_token: token,
                expires_in: "1d",
                user: payload
            };

            // await this.cacheService.save(`${this.cacheKey}:${data.access_token}`, JSON.stringify(data));


            res.cookie('access_token', token, {maxAge: (24 * 60 * 60 * 1000)});
            res.cookie('auth_user', JSON.stringify(payload), {maxAge: (24 * 60 * 60 * 1000)});

            return res.status(200)
                .send({data: data, message: "Authentication successful!"});

        })(req, res, next);
    }

    user = async (req: Request, res: Response) => {
        try {
            const token = req.body.token;

            // let data = await this.cacheService.get(`${this.cacheKey}:${token}`);

            if (!token) {
                return res.status(401)
                    .send({message: "Token is required."});
            }

            jwt.verify(token, config('app.secretKey'), async (err, decoded) => {
                if (err) {
                    return res.status(401)
                        .send({message: "Invalid Token"});
                }
                const id = decoded?._id;

                const userData = await this.userService.getById(id);

                if(!userData) {
                    return res.status(500)
                        .send({message: "User not found"});
                }
                return res.status(200)
                    .json({data: userData, message: "User data retrieved."});
            });

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "User can not be retrieved"});
        }
    }

    me = async (req: Request, res: Response, next: any) => {

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401)
                .send({message: "Authorization header is required."});
        }

        const authorizationData = authorization.split(' ');
        const type = authorizationData[0] || '';
        const token = authorizationData[1] || '';


        if (!type || type !== 'Bearer') {
            return res.status(401)
                .send({message: "Invalid type. Token type must be Bearer."});
        }

        jwt.verify(token, config('app.secretKey'), (err, decoded) => {
            if (err) {
                return res.status(401)
                    .send({error: err, message: "Invalid Token"});
            }
        });

        let data = await this.cacheService.get(`${this.cacheKey}:${token}`);


        if (!data) {
            return res.status(401)
                .send({ message: "Invalid Token"});
        }

        data = JSON.parse(data);

        return res.status(200)
            .send({data: data, message: "User data retrieved."});
    }

    logout = async (req: Request, res: Response, next: any) => {
        try {
            const token = req.body.token;

            if (!token) {
                return res.status(401)
                    .send({message: "Token is required."});
            }

             await this.cacheService.delete(`${this.cacheKey}:${token}`);

            return res.status(200)
                .send({message: "User is logged out!"});
        }catch (err) {
            return res.status(500)
                .send({error: err, message: "User can not be logout"});
        }
    }

    register = async (req: Request, res: Response, next: any) => {

        try {

            const existingUser = await this.userService.getAll({email: req?.body?.email});

            if(!req.body.email) {
                return res.status(500)
                    .send({message: "Please enter your email"});
            }
            if(!req.body.password) {
                return res.status(500)
                    .send({message: "Please enter your password"});
            }

            if(existingUser.length === 0) {
                const data = await this.userService.create(req.body);

                return res.status(201)
                    .send({data: data, message: "User data created."});
            }
            else {
                return res.status(500)
                    .send({message: "This email is already used"});
            }
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! Registration unsuccessful"});
        }
    }

}