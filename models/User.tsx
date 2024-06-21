import {Schema,model,models} from 'mongoose'
const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email alread exists'],
        required:[true,'Email is required']
    },
    // fullname:{
    //     type:String,
    //     required:[true,'Fullname is required'],
    // },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "password invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    phoneNumber:{
     type:Number,
     unique:[true,'Phone number already exists'],
     match:['^[0-9]+$','Phone number invalid, it should contain 10 digits!']
    },
    confirmPassword:{
        type:String,       
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    role:{
        type:String,
        enum:['Trainee','Client','super_admin'],
        default:'Client',
        required:[true,'User type is required']
    }
})
const User = models.User || model("User", UserSchema);
export default User;