import jwt from "jsonwebtoken";
const ioMiddleware = async (socket,next) => {
    const token = socket.handshake.auth.token ?? "";
    let verifiedToken;
    try {
      verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      if (!verifiedToken) {
        const err = new Error("Token expired");
        next(err);
      }else{
        next();
      }
    } catch (error) {
      next(new Error("Invalid token"));
    }
}

export default ioMiddleware
