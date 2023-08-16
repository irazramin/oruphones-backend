import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ExperienceModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    jobType: {
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


const Experience = mongoose.model('Experiences', ExperienceModel);

export default Experience;

