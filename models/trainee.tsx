import { Schema,model,models } from "mongoose";
const TraineeSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    numberof_client:{
     type:Number,
     min:1,
     required:true,  
    },
    height:{
        type:Number,
        required:[true,'Height is required'],
        min:100,
        max:250
    },
    weight:{
        type:Number,
        required:[true,'Weight is required'],
        min:30,
        max:200
    },
    Speciality:{
        type:String,
        required:[true,'Speciality is required']
    } ,
    clientsReviews:{
        type:Array,
        default:[]
    },
    Livesession:{
        type:Number,
        default:[]
    },
    total_no_clients:{
        type:Number,
        default:0
    }

})
const Trainee = models.Trainee || model('Trainee', TraineeSchema)
export default Trainee;