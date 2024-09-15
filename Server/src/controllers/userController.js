import express from 'express';
import { getAllUsers } from '../models/userModel.js';

const userController = express.Router();

userController.get("/all",getAllUsers);

export default userController;