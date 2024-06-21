import { Schema, model, models } from "mongoose"
const ClientSchema = new Schema({
    UserInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    trainee_id:{
    type: Schema.Types.ObjectId,
    ref: 'Trainee',
    },
    gender:{
        type :String,
        enum:['male','female','other'],
        default:'male'
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
        min:16
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
    goalWeight:{
        type:Number,
        min:[35, 'Weight cant be less than 35 '],
        max:[95,'Weight should not  be greater than 95']
    },
    maingoal:{
        type:String,
        enum:['gain weight','lose weight','maintain weight' , 'get muscle mass' , 'get stronger'],
        default:'maintain weight'
    },
    traininglevel:{
        type:String,
        enum:['Beginner','Irregular Training','Medium','Advanced'],
        default:'Beginner'
    },
    interestedActivities:{
        type:String,
        enum:['Running','Cycling','Swimming','Yoga','Zumba'],
        default:'Running'
    },
    membership_level: { 
        type: String ,
        enum: ['Basic', 'Silver', 'Gold', 'Platinum'],
        default: 'Basic'
     }, 
    contract_start_date: { 
        type: Date ,
        default: Date.now()
     },
    contract_end_date: { 
        type: Date ,
     },  
})
const Client = models.Client || model("Client",ClientSchema);
export default Client;
