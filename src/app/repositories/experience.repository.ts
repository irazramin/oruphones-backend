import {Experience, User, UserSkill} from "../models";
import {RepositoryContract} from "../contracts";

class ExperienceRepository extends RepositoryContract {
    model: any = Experience;
}

export default ExperienceRepository;