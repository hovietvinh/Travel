const env = require("dotenv")
env.config()
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req,res,next)=>{
    try {
        // console.log(req.cookies);
        const {user_token} = req.cookies;

        // console.log(123);
        if(user_token){
            // console.log( process.env.JWT_SECRET);
            try {
                const decoded = jwt.verify(user_token, process.env.JWT_SECRET);
                // console.log(decoded);
                req.user = decoded
                next()
              } catch(err) {
                 return res.json(
                    { 
                        message: '',
                        code:401
                    });
              }
        }
        else{
            return res.json(
                { 
                    message: 'You need to log in to access this resource.',
                    code:401
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

