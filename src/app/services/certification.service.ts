import {UserRepository, UserSkillRepository} from "../repositories";
import {ServiceContract} from "../contracts";
import CertificationRepository from "../repositories/certification.repository";


class CertificationService extends ServiceContract {
    repository: any = new CertificationRepository();

    tag: string = 'certification';

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

export default CertificationService;