import { Mongoose ,  Schema , model, models } from "mongoose";
const membership_level = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})