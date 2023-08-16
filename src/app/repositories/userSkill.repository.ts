import {User, UserSkill} from "../models";
import {RepositoryContract} from "../contracts";

class UserSkillRepository extends RepositoryContract {
    model: any = UserSkill;
}

export default UserSkillRepository;