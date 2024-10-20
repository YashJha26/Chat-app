import express from "express";
import {prisma} from "../socket/prisma.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const generateToken = (user) =>{
    const accessToken = jwt.sign({
        email:user?.email,
        id:user?.id,
        name:user?.name,
        imageUrl:user?.imageUrl
    },process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
    return accessToken;
}

export const signup = async (req ,res) =>{
    const {email,password,name,imageUrl} = req?.body;
    if (!email) {
        return res.json({ message: "Email is required" });
      }
      if (!password) {
        return res.json({ message: "Password is required" });
      }
      if (!name) {
        return res.json({ message: "Name is required" });
      }

      try {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            return res.json({ message: "Email is already in use" });
        }
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await prisma.user.create({
                data: { email, name, imageUrl, password: hashedPassword },
            });


            res.cookie('token', token, {
              httpOnly: false,   // Allows access on the client-side
              secure: true,      // Ensures the cookie is sent over HTTPS
              sameSite: 'None',  // For cross-origin requests
                path: '/',
                domain: '.onrender.com', // Makes the cookie accessible to all subdomains
            });

            return res.json({
                message: "Signed up successfully",
                user: {
                  email: newUser?.email,
                  id: newUser?.id,
                  name: newUser?.name,
                  imageUrl: newUser?.imageUrl,
                },
            });
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: error?.toString() });  
      }
} 

export const login = async (req,res) => {
    const { email, password } = req?.body;
    if (!email) {
      return res.json({ message: "Email is required" });
    }
    if (!password) {
      return res.json({ message: "Password is required" });
    }
  
    try {
      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (!existingUser) {
        return res.json({ message: "Couldn't find the user" });
      }
      if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!isPasswordValid) {
          return res.json({ message: "Invalid password" });
        }
        const token=await generateToken(existingUser);
        res.cookie('token', token, {
          httpOnly: false,   // Allows access on the client-side
          secure: true,      // Ensures the cookie is sent over HTTPS
          sameSite: 'None',  // For cross-origin requests
              path: '/',
            domain: '.onrender.com', // Makes the cookie accessible to all subdomains
        });

        return res.json({
          message: "Logged in successfully",
          token:token,
          user: {
            email: existingUser?.email,
            id: existingUser?.id,
            name: existingUser?.name,
            imageUrl: existingUser?.imageUrl,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: error?.toString() });
    }
};

export const verifyUser = async (req, res) => {
    const cookies = req?.cookies;
    if (cookies?.token) {
      try {
        const decodedToken = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
          return res.redirect(process.env.CLIENT_AUTH_URL);
        }
  
        const existingUser = await prisma.user.findFirst({
          where: { email: decodedToken?.email },
        });
  
        if (!existingUser) {
          return res.redirect(process.env.CLIENT_AUTH_URL);
        }
  
        return res.json({
          isAuthenticated: true,
          user: {
            email: existingUser?.email,
            id: existingUser?.id,
            name: existingUser?.name,
            imageUrl: existingUser?.imageUrl,
          },
        });
      } catch (error) {
        console.error(error);
        return res.redirect(process.env.CLIENT_AUTH_URL);
      }
    }
  };

