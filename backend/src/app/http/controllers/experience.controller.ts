import {ExperienceService} from "../../services";
import {ControllerContract} from "../../contracts";

class ExperienceController extends ControllerContract {
    private experienceService: ExperienceService = new ExperienceService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            let query = req?.query;

            let response = await this.experienceService.getAll({user: req.query.user});

            return res.status(200).send({data: response, message: "experience data retrieved"});

        } catch (err) {
            console.log(err)
            return res.status(500).send({error: err, message: "Something went wrong! Experience data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.experienceService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "experience data not found."});
            }

            return res.status(200)
                .send({data: response, message: "experience data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! experience data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body)
            const data = await this.experienceService.createMany(body);

            return res.status(201)
                .send({data: data, message: "UserS kill data created."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! experience data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;


            // const existingData = await this.experienceService.getById(id);
            //
            // if(!existingData) {
            //      await this.experienceService.deleteAllAndListCache();
            //     console.log("existing",existingData)
            //     return res.status(404)
            //         .send({message: "experience data not found."});
            // }

            const data = await this.experienceService.updateMany(body);

            return res.status(201).send({message: 'success', data: data});

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! experience data cannot be retrieved."});
        }
    };
}

export default ExperienceController;