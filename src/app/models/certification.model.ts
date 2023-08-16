import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const CertificationModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    certification: {
        type: String,
        required: false
    },
    institude: {
        type: String,
        required: false
    }
});

const Certification = mongoose.model('Certifications', CertificationModel);

export default Certification;

