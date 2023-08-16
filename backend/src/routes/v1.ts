import express, { Router } from "express";
import {
    AuthController,
    CertificationController,
    EducationController,
    ExperienceController,
    UserController
} from "../app/http/controllers";
import UserSkillController from "../app/http/controllers/userSkill.controller";

class V1Routes {
    public router: Router;
    protected userController: UserController = new UserController();
    protected userSkillController: UserSkillController = new UserSkillController();
    protected certificationController: CertificationController = new CertificationController();
    protected experienceController: ExperienceController = new ExperienceController();
    protected educationController: EducationController = new EducationController();
    protected authController: AuthController = new AuthController();

    constructor() {
        this.router = express.Router();
        this.register();
    }

    register(): void {
        // user routes
        this.router.get('/user', this.userController.getAll);
        this.router.get('/user/:id', this.userController.getById);
        this.router.post('/user', this.userController.create);
        this.router.put('/user/:id', this.userController.update);

        // user skill routes
        this.router.get('/skill', this.userSkillController.getAll);
        this.router.get('/skill/:id', this.userSkillController.getById);
        this.router.post('/skill', this.userSkillController.create);
        this.router.put('/skill', this.userSkillController.update);

        // certification routes
        this.router.get('/certification', this.certificationController.getAll);
        this.router.get('/certification/:id', this.certificationController.getById);
        this.router.post('/certification', this.certificationController.create);
        this.router.put('/certification', this.certificationController.update);

        // experience routes
        this.router.get('/experience', this.experienceController.getAll);
        this.router.get('/experience/:id', this.experienceController.getById);
        this.router.post('/experience', this.experienceController.create);
        this.router.put('/experience', this.experienceController.update);

        // experience routes
        this.router.get('/education', this.educationController.getAll);
        this.router.get('/education/:id', this.educationController.getById);
        this.router.post('/education', this.educationController.create);
        this.router.put('/education', this.educationController.update);

        //  auth routes
        this.router.post('/auth/register', this.authController.register);
        this.router.post('/auth/login', this.authController.login);
        this.router.post('/auth/user', this.authController.user);
        this.router.post('/auth/logout', this.authController.logout);
    }
}

export let v1Route = new V1Routes();