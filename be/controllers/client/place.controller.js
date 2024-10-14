const Place = require("../../models/place.model");
const moment = require('moment');



module.exports.add =async (req,res)=>{
    try {
        // console.log(req.body);
        req.body.owner = req.user._id
        if (req.body.checkIn) {
            req.body.checkIn = moment(req.body.checkIn, 'HH:mm').format('HH:mm');
        }
        if (req.body.checkOut) {
            req.body.checkOut = moment(req.body.checkOut, 'HH:mm').format('HH:mm');
        }
        const data = new Place(req.body)
        await data.save()
        // console.log(2);
        res.json({
            code:200
        })
        
        
    } catch (error) {
        console.log(error);
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}


module.exports.index =async (req,res)=>{
    try {
       
        const find = {
            deleted:false,
            owner:req.user._id
        }
        const data = await Place.find(find);

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

module.exports.findById =async (req,res)=>{
    try {
       
        const find = {
            deleted:false,
            _id:req.params.id
        }
        const data = await Place.findOne(find);
        if(data){
            res.json({
                code:200,
                data:data
            }) 
        }
        else{
            res.json({
                code:400,
                message:"Place not found."
            })
        }
        
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}


module.exports.update =async (req,res)=>{
    try {
        // console.log(req.body);
       const item = await Place.findByIdAndUpdate(req.params.id,req.body)

       if(item){
        return res.json({
            code:200,
            message:"Update place successfully!"
           })
       }
       else{
        return res.json({
            code:400,
            message:"Failed toUpdate place!"
           })
       }
       
        
    } catch (error) {
        console.log(error);
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}
