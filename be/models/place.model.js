const mongoose = require("mongoose")
const placeSchema = new mongoose.Schema(
    {
        title:String,
        address:String,
        photos:[String],
        description:String,
        perks:[String],
        extraInfo:String,
        checkIn:Number,
        checkOut:Number,
        maxGuests:Number,
        owner:String,
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt:Date,

    },{
        timestamps:true
    }
)

const Place = mongoose.model("Place",userSchema,"places")

module.exports = Place  