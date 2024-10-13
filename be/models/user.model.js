const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        userName:String,  
        email:{
            type:String,
            unique:true
        },
        password:String,
        phone:String,
        avatar:String,
        status:{
            type:String,
            default:"active"
        },
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt:Date,

    },{
        timestamps:true
    }
)

const User = mongoose.model("User",userSchema,"users")

module.exports = User 