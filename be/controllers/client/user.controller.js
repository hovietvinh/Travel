const User = require("../../models/user.model")
const md5 = require("md5")
const env = require("dotenv")
const jwt = require("jsonwebtoken")
const { uploadFromUrl, uploadFilesToCloudinary } = require("../../middlewares/uploadImage")
env.config()
//[POST] /api/users/register
module.exports.register =async (req,res)=>{
    try {
        // console.log(req.body);
        // const {userName,email,password} = req.body

        const exist = await User.findOne({
            deleted:false,
            email:req.body.email
        })
        if(exist){
            
            res.json({
                code:400,
                message:'Email already exists'
            })
            return;
        }
        else{
            
            req.body.password = md5(req.body.password)
            const data = new User(req.body)
            await data.save()
            res.status(200).json({
                code:200,
                data:data
            })
        }

        
    } catch (error) {
        // console.log(error);
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}

//[POST] /api/users/login
module.exports.login =async (req,res)=>{
    try {
        
        req.body.password = md5(req.body.password)
        req.body["deleted"] = false
        const data = await User.findOne(req.body);
        if(data){
            const payload = {
                _id:data._id,
                email:data.email,
                userName:data.userName,
                phone:data.phone||"",
                avatar:data.avatar ||""
            }
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE   
                }
            )
            res.cookie("user_token",token);
            res.json({
                code:200,
                data:payload
            });
        }
        else{
            res.json({
                code:400,
                message:"Incorrect email or password"
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

//[GET] /api/users/profile
module.exports.profile =async (req,res)=>{
    try {
        // console.log(req.cookies);
        const {user_token} = req.cookies;

        // console.log(123);
        if(user_token){
            try {
                const decoded = jwt.verify(user_token, process.env.JWT_SECRET);
                res.json({
                    code:200,
                    data:decoded
                })
              } catch(err) {
                res.json(null)
              }
        }
        else{
            res.json(null)
        }
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}

//[POST] /api/users/logout
module.exports.logout =async (req,res)=>{
    try {
      

        res.cookie("user_token","");
        res.json({
            code:200,
            message:"Logout successfully!"
        })
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}


module.exports.uploadByLink = async (req,res)=>{
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.json({
                code:400,
                message: "The image URL cannot be empty."
            });
        }
        const uploadResult = await uploadFromUrl(imageUrl);
        if(uploadResult.code==200){
            res.json({ 
                code:200,
                 data: uploadResult.uploadResult
             });
        }
        else{
            res.json({ 
                code:400,
                message: uploadResult.message
             });
        }
        
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}

module.exports.uploadByFiles = async (req,res)=>{
    try {
        const files = req.files; // Get the files from the request
        if (!files || files.length === 0) {
            return  res.json(
                { 
                    message: "No files were uploaded.",
                    code:400
                });
        }
        const uploadPromises = files.map(file => uploadFilesToCloudinary(file));
        const results = await Promise.all(uploadPromises); 
        return res.json({
            code:200,
            data:results
        });
    } catch (error) {
        res.json(
            { 
                message: 'Internal Server Error',
                code:400
            });
    }
}