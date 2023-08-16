import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSkillModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: false
    }
});


const UserSkill = mongoose.model('UserSkills', UserSkillModel);

export default UserSkill;

