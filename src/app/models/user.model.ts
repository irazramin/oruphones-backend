import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});

UserModel.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } catch (err) {
        return next(err);
    }
});

UserModel.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('Users', UserModel);

export default User;

