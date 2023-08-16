import {Education, User, UserSkill} from "../models";
import {RepositoryContract} from "../contracts";

class EducationRepository extends RepositoryContract {
    model: any = Education;
}

export default EducationRepository;