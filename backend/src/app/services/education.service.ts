import {EducationRepository, UserRepository, UserSkillRepository} from "../repositories";
import {ServiceContract} from "../contracts";


class EducationService extends ServiceContract {
    repository: any = new EducationRepository();

    tag: string = 'education';

    prepareConditions(query: any): any {
        let conditions = {...query}
        const keyword = conditions?.search ?? "";
        delete conditions.search;

        return keyword ? {
            ...conditions,
            $or: [
                {firstName: {$regex: keyword, $options: 'i'}},
                {lastName: {$regex: keyword, $options: 'i'}},
                {email: {$regex: keyword, $options: 'i'}},
                {phone: {$regex: keyword, $options: 'i'}},
            ]
        } : {
            ...conditions
        };
    }


}

export default EducationService;