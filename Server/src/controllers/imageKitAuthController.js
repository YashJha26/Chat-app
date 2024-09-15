import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import { deleteImageKitFileRoute } from "../models/imageKitModel.js";

dotenv.config();
export const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLICKEY,
    privateKey: process.env.IMAGE_KIT_PRIVATEKEY,
});

const imageKitAuthController = express.Router();

imageKitAuthController.get("/auth",(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

imageKitAuthController.delete("/delete",deleteImageKitFileRoute);
export default imageKitAuthController;