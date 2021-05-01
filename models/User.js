import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        /*id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },*/
        name: {
            type: String,
            required: 'Name is required',
        },
        lastname: {
            type: String,
            required: 'Lastname is required',
        },
        nickname: {
            type: String,
            unique: true,
            required: "Nickname is required",
            lowercase: true,
            maxLength: 30
        },
        address: {
            type: String,
            required: 'Address is required'
        },
        bio: {
            type: String,
            maxLength: 100
        }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User