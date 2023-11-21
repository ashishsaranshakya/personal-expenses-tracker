import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    provider_id: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    profile_picture_url: {
        type: String
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;