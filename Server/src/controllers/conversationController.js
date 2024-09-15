import express from 'express';
import { createConversation, deleteConversation, getConversation } from '../models/conversationModel.js';

const conversationController = express.Router();

conversationController.post("/create",createConversation);
conversationController.post("/",getConversation);
conversationController.delete("/delete",deleteConversation);
export default conversationController;