import {UserRepository, UserSkillRepository} from "../repositories";
import {ServiceContract} from "../contracts";


class UserSkillService extends ServiceContract {
    repository: any = new UserSkillRepository();

    tag: string = 'userSkill';

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

export default UserSkillService;