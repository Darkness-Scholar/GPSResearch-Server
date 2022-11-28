import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: { // Position sẽ lưu lại mỗi lần 1 user request bất kỳ tới server
        lat: { type: String, default: 0 },
        long: { type: String, default: 0 }
    }
}, { timestamps: true })

export const UserModel = mongoose.model('User', UserSchema, 'user')