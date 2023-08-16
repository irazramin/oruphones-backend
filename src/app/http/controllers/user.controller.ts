import {UserService} from "../../services";
import {ControllerContract} from "../../contracts";

class UserController extends ControllerContract {
    private userService: UserService = new UserService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            const query = req?.query;

            let response = await this.userService.getAll(query);

            return res.status(200).send({data: response, message: "User data retrieved"});

        } catch (err) {
            console.log(err)
            return res.status(500).send({error: err, message: "Something went wrong! User data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.userService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "User data not found."});
            }

            console.log("okkkk")
            return res.status(200)
                .send({data: response, message: "User data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body)
            const data = await this.userService.create(body);

            return res.status(201)
                .send({data: data, message: "User data created."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;


            const existingData = await this.userService.getById(id);

            if(!existingData) {
                 await this.userService.deleteAllAndListCache();
                console.log("existing",existingData)
                return res.status(404)
                    .send({message: "User data not found."});
            }

            const data = await this.userService.update(id, body);

            return res.status(201).send({message: 'success', data: data});

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! User data cannot be retrieved."});
        }
    };
}

export default UserController;