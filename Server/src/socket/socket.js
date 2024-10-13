import {Server}from 'socket.io';
import express from 'express';
import {createServer} from 'node:http'
const app = express();
const server = createServer(app);

const allowedOrigins = [
    'http://localhost:5173',
    'https://chatappfrontend-cvy9.onrender.com',
    process.env.CLIENT_AUTH_URL || ''
].filter(Boolean); 

const io = new Server(server,{
    cors:{ 
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        credentials: true,
}})

export {app,server,io};
