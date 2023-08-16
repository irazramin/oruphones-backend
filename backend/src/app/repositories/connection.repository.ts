import {Connection} from "../models";
import {RepositoryContract} from "../contracts";

class ConnectionRepository extends RepositoryContract {
    model: any = Connection;
}

export default ConnectionRepository;