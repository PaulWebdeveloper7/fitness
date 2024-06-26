import {Schema,model,models} from 'mongoose'
import { isEmail } from 'validator';

const UserSchema = new Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required'],
        validate: [ isEmail, 'invalid email' ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phoneNumber:{
     type:Number,
     unique:[true,'Phone number already exists'],
    },
    confirmPassword:{
        type:String   
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    role:{
        type:String,
        enum:['Trainee','Client','Super-admin'],
        default:'Client',
        required:[true,'User type is required']
    }
})
const User = models.User || model("User", UserSchema);
export default User;