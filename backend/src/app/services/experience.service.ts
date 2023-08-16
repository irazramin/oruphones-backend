import {ExperienceRepository, UserRepository, UserSkillRepository} from "../repositories";
import {ServiceContract} from "../contracts";


class ExperienceService extends ServiceContract {
    repository: any = new ExperienceRepository();

    tag: string = 'experience';

    prepareConditions(query: any): any {
        let conditions = {...query}
        const keyword = conditions?.search ?? "";
        delete conditions.search;

        return keyword ? {
            ...conditions,
            $or: [
                {company: {$regex: keyword, $options: 'i'}},
                {lastName: {$regex: keyword, $options: 'i'}},
                {email: {$regex: keyword, $options: 'i'}},
                {phone: {$regex: keyword, $options: 'i'}},
            ]
        } : {
            ...conditions
        };
    }


}

export default ExperienceService;