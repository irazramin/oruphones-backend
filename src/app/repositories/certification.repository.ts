import {Certification} from "../models";
import {RepositoryContract} from "../contracts";

class CertificationRepository extends RepositoryContract {
    model: any = Certification;
}

export default CertificationRepository;