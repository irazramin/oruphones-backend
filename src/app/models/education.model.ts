import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const EducationModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    college: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    }
});


const Education = mongoose.model('Educations', EducationModel);

export default Education;

