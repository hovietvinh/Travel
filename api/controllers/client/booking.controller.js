const Booking = require("../../models/booking.model");
const helper = require("../../helpers/Date")

module.exports.booking =async (req,res)=>{
    try {

        // const 
        const days=helper.calculateDateDifference(req.body.checkIn,req.body.checkOut)
        if(days<0){
            return res.json({
                code:400,
                message:"Invalid check-in/check-out."
            })
        }
        req.body["price"] = days * req.body.pricePerNight;
        const data = new Booking(req.body)
        await data.save();

       res.json({
            code:200,
            message:"Booking successfully!"
       })
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}

module.exports.index = async (req,res)=>{
    try {
        const find={
            deleted:false,
            userId:req.user._id
        }
       
       const data = await Booking.find(find).populate("placeId")
    //    console.log(data,find);
       
       res.json({
        code:200,
        data:data
       })
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}