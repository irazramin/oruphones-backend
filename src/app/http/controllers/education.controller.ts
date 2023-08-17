import {EducationService} from "../../services";
import {ControllerContract} from "../../contracts";

class EducationController extends ControllerContract {
    private educationService: EducationService = new EducationService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            const query = req?.query;

            let response = await this.educationService.getAll(query);

            return res.status(200).send({data: response, message: "education data retrieved"});

        } catch (err) {
            console.log(err)
            return res.status(500).send({error: err, message: "Something went wrong! Education data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.educationService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "education data not found."});
            }

            return res.status(200)
                .send({data: response, message: "education data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! education data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body)
            const data = await this.educationService.createMany(body);

            return res.status(201)
                .send({data: data, message: "education data created."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! education data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;


            // const existingData = await this.educationService.getById(id);
            //
            // if(!existingData) {
            //      await this.educationService.deleteAllAndListCache();
            //     console.log("existing",existingData)
            //     return res.status(404)
            //         .send({message: "education data not found."});
            // }

            const data = await this.educationService.updateMany(body);

            return res.status(201).send({message: 'success', status: 201});

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! education data cannot be retrieved."});
        }
    };
}

export default EducationController;