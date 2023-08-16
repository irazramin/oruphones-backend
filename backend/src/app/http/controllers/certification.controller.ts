import {CertificationService} from "../../services";
import {ControllerContract} from "../../contracts";

class CertificationController extends ControllerContract {
    private certificationService: CertificationService = new CertificationService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            let query = req?.query;


            console.log({user: req.query.user})
            let response = await this.certificationService.getAll({user: req.query.user});

            return res.status(200).send({data: response, message: "certification data retrieved"});

        } catch (err) {
            console.log(err)
            return res.status(500).send({error: err, message: "Something went wrong! Certification data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.certificationService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "certification data not found."});
            }

            return res.status(200)
                .send({data: response, message: "certification data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! certification data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body);
            const data = await this.certificationService.createMany(body);

            console.log(data)
            return res.status(201)
                .send({data: data, message: "certification data created."});
        } catch (err) {
            console.log(err)
            return res.status(500)
                .send({error: err, message: "Something went wrong! certification data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;


            // const existingData = await this.certificationService.getById(id);
            //
            // if(!existingData) {
            //      await this.certificationService.deleteAllAndListCache();
            //     console.log("existing",existingData)
            //     return res.status(404)
            //         .send({message: "certification data not found."});
            // }

            const data = await this.certificationService.updateMany(body);

            return res.status(201).send({message: 'success', data: data});

        } catch (err) {
            console.log(err)
            return res.status(500)
                .send({error: err, message: "Something went wrong! certification data cannot be retrieved."});
        }
    };
}

export default CertificationController;