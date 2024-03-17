import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new Schema({
   username:{
       type:String,
       require:true,
       unique:true,
       lowercase:true,
       trim: true,
       index:true
   },
   email: {
       type:String,
       require:true,
       lowercase:true,
       trim: true,
       unique:true
   },
   fullName:{
       type:String,
       require:true,
       lowercase:true,
       index:true,
       trime:true
   },
   avatar:{
       type:String,
       require:true,
   },
   coverImage:{
       type: String
   },
   watchHistory:[
       {
           type: Schema.Types.ObjectId, 
           ref:"Video"
       }
   ],
   password:{
       type:String,
       required:[true,"passward is required"]
   },
   refreshToken:{
       type:String
   },
},
{
   timestamps:true
}
)

userSchema.pre("save", function(next){
    if (!this.isModified("passward")) return next();
    this.password=bcrypt.hashSync(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect= async function(passward){
   return await bcrypt.compare(passward,this.password)
}


userSchema.methods.generateAccessToken=function(){
   return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY},
    )
}


userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign(
         {
             _id:this._id,
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:process.env.REFRESH_TOKEN_EXPIRY},
     )
}

const User=mongoose.model("User",userSchema)