const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema(
    {
        placeId:{
            require:true,
            type: mongoose.Schema.Types.ObjectId,
            ref:"Place"
        },
        checkIn:{
            require:true,
            type:Date
        },
        checkOut:{
            require:true,
            type:Date
        },
        name:{
            require:true,
            type:String
        },
        phone:{
            require:true,
            type:String
        },
        price:Number,
        userId:{
            require:true,
            type:String
        },
        deleted: {
            type:Boolean,
            default:false
        },

    },{
        timestamps:true
    }
)

const Booking = mongoose.model("Booking",bookingSchema,"bookings")

module.exports = Booking 