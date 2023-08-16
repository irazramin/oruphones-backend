import {ConnectionService} from "../../services";
import {ControllerContract} from "../../contracts";

class ConnectionController extends ControllerContract {
    private connectionService: ConnectionService = new ConnectionService();

    getAll = async (req: Request | any, res: Response | any) => {
        try {
            const query = req?.query;
            const user = req?.query?.user

            let response = await this.connectionService.getAll(query);

            console.log("ok")
            const filterConnection = response.filter((res) => res._id !== user)

            if(!filterConnection) {
                return res.status(500).send({message: "Something went wrong! Connection data cannot be retrieved."});
            }
            return res.status(200).send({data: filterConnection, message: "connection data retrieved"});

        } catch (err) {
            return res.status(500).send({error: err, message: "Something went wrong! Connection data cannot be retrieved."});
        }
    };


    getById = async (req: Request | any, res: Response | any) => {
        try {
            const {id} = req.params;

            let response = await this.connectionService.getById(id);

            if (!response) {
                return res.status(404)
                    .send({message: "connection data not found."});
            }

            return res.status(200)
                .send({data: response, message: "connection data retrieved."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! connection data cannot be retrieved."});
        }
    };

    create = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            console.log(body)
            const data = await this.connectionService.createMany(body);

            return res.status(201)
                .send({data: data, message: "UserS kill data created."});
        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! connection data cannot be created."});
        }
    };

    update = async (req: Request | any, res: Response | any) => {
        try {
            let body = req.body;
            const {id} = req.params;


            // const existingData = await this.connectionService.getById(id);
            //
            // if(!existingData) {
            //      await this.connectionService.deleteAllAndListCache();
            //     console.log("existing",existingData)
            //     return res.status(404)
            //         .send({message: "connection data not found."});
            // }

            const data = await this.connectionService.updateMany(body);

            return res.status(201).send({message: 'success', data: data});

        } catch (err) {
            return res.status(500)
                .send({error: err, message: "Something went wrong! connection data cannot be retrieved."});
        }
    };
}

export default ConnectionController;