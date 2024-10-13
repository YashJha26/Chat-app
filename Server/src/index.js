import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import {app,io,server} from './socket/socket.js'
import authMiddleware from './middlewares/authMiddleware.js';
import authController from './controllers/authController.js';
import userController from './controllers/userController.js';
import conversationController from './controllers/conversationController.js';
import messageController from './controllers/messageController.js';
import { handleEvents } from './socket/events.js';
import imageKitAuthController from './controllers/imageKitAuthController.js';
import ioMiddleware from './middlewares/ioMiddleware.js';

dotenv.config();
const allowedOrigins = ['http://localhost:5173','https://chatappfrontend-cvy9.onrender.com','https://670bd090e9aca37902b4aad0--chatappfrontend1122.netlify.app'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

io.use(ioMiddleware).on("connect",(socket)=>{
    //console.log("socket",socket);
    handleEvents(socket);
})

app.get("/",(req,res)=>{
    res.send("Testing");
})

app.use("/api/auth",authController);
app.use("/api/users",authMiddleware,userController);
app.use("/api/conversation",authMiddleware,conversationController);
app.use("/api/message",authMiddleware,messageController);
app.use("/api/img-kit",imageKitAuthController);

server.listen(process.env.PORT||8000,()=>{
    console.log(`Server is running in port ${process.env.PORT}`);
})


