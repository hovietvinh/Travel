const mongoose = require("mongoose")
const placeSchema = new mongoose.Schema(
    {
        title:String,
        address:String,
        photos:[String],
        description:String,
        perks:[String],
        extraInfo:String,
        checkIn:String,
        checkOut:String,
        maxGuests:Number,
        owner:String,
        pricePerNight:Number,
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt:Date,

    },{
        timestamps:true
    }
)

const Place = mongoose.model("Place",placeSchema,"places")

module.exports = Place  