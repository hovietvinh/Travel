const Place = require("../../models/place.model");


module.exports.index =async (req,res)=>{
    try {
       const find = {
            deleted:false
       }
       const data =await Place.find(find);
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


module.exports.getById =async (req,res)=>{
    try {
       const find = {
            deleted:false,
            _id:req.params.id
       }
       const data =await Place.findOne(find);
       if(data){
        res.json({
            code:200,
            data:data
       })
       }
       else{
        res.json({
            code:400,
            message:"Found place fail!"
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