import jwt from 'jsonwebtoken';
const authMiddleware = async (req,res,next) =>{
    const token = req?.cookies?.token??null;
    let verifiedToken;
    try {
        if(token){
            verifiedToken= await jwt.verify(token,process.env.JWT_SECRET_KEY);
            if(!verifiedToken){
                res.json({message:"No token / token expired "}).redirect(process.env.CLIENT_AUTH_URL);
            }
            req.user = verifiedToken;
            next();
        }else{
            res.json({message:"No token / token expired "});
        }
    } catch (error) {
        res.json({message:"No token / token expired "});
        next(error)
    }
}

export default authMiddleware;