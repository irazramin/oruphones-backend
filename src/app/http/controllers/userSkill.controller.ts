import {UserSkillService} from "../../services";
import {ControllerContract} from "../../contracts";

class UserSkillController extends ControllerContract {
    private userSkillService: UserSkillService = new UserSkillService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            const query = req?.query;

            let response = await this.userSkillService.getAll(query);

            return res.status(200).send({data: response, message: "User Skill data retrieved"});

        } catch (err) {
            console.log(err)
            return res.status(500).send({error: err, message: "Something went wrong! UserSkill data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.userSkillService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "User Skill data not found."});
            }

            return res.status(200)
                .send({data: response, message: "User Skill data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User Skill data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body)
            const data = await this.userSkillService.createMany(body);

            return res.status(201)
                .send({data: data, message: "UserS kill data created."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User Skill data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;



            const data = await this.userSkillService.updateMany(body);

            return res.status(201).send({message: 'success', data: data});

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User Skill data cannot be retrieved."});
        }
    };
}

export default UserSkillController;