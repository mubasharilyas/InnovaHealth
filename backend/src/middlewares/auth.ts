
import jwt from 'jsonwebtoken';

var JWT_TOKEN='secret';
export const Auth =(req:any,res:any,next:any)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,JWT_TOKEN);
        req.userData = decoded;
        // console.log("DECODED :",decoded);
    next();
    } catch (error) {
        res.status(404).json({
            message:'Authentication failed'
        })
    }
    
   
}