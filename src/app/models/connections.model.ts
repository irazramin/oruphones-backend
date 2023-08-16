import mongoose from 'mongoose';

const ConnectionModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    connectionId: {
        type: String,
        required: false
    }
});


const Connection = mongoose.model('Connections', ConnectionModel);

export default Connection;

