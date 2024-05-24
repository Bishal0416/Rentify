import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNo:{
        type:Number,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;