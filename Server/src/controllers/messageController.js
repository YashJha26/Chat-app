import express from 'express';
import { createMessage, deleteMessage, getMessage } from '../models/messageModel.js';

const messageController=express.Router();

messageController.post("/",getMessage);
messageController.post("/create",createMessage);
messageController.delete("/delete",deleteMessage);

export default messageController;