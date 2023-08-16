import {User} from "../models";
import {RepositoryContract} from "../contracts";

class UserRepository extends RepositoryContract {
    model: any = User;
}

export default UserRepository;