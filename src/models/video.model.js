import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema= new Schema({
    viedoFile:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    title:{
        type: String,
        required:[true,"Please provide a title for the video."],
    },
    description:{
        type:String,
        require:[true,"Please provide a short description of the video."]
    },
    duration:{
        type:String,
        require:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User" 
    }
    
},
{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model( "Video",videoSchema);