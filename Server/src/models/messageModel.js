import { prisma } from "../socket/prisma.js"
import {io} from '../socket/socket.js'
export const createMessage = async (req,res)=>{
    //console.log(req?.body);
    try {
        const message = await prisma.message.create({
            data:{
                ...req?.body?.messageBody,
                sender: { connect: { id: req?.body?.senderId } },
                conversation: { connect: { id: req?.body?.conversationId } },
            },
            include: {
                sender: {
                  include: {
                    user: { select: { id: true, imageUrl: true, email: true } },
                  },
                },
                conversation:{include:{members:{select:{userId:true}}}},
            },
        })
        io.to(req?.body?.conversationId).emit("newMessage",message);
        message?.conversation?.members?.forEach((member)=>{
            console.log(member?.userId);
            io.to(member?.userId).emit("newMessageInConversation",message);
        })
        return res.json(message);
    } catch (error) {
        console.log(error);
        return res.json({ error: error?.toString() });
    }
}

export const getMessage = async (req,res)=>{
    try {
        const messages = await prisma.message.findMany({
            where:{conversationId:req?.body?.conversationId},
            include:{
                sender:{
                    include:{
                        user:{
                            select:{id:true,imageUrl:true,email:true,name:true}
                        }
                    }
                }
            }
        })
        return res.json(messages);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()});
    }
}

export const deleteMessage = async(req,res) =>{
    try {
        const message = await prisma.message.findFirst({
            where:{id:req?.body?.message?.id},
            include:{ conversation: {
                include: { members: { include: { user: { select: { id:true } } } } } } 
            },
        });
        const member = await prisma.member.findFirst({
            where:{id:message?.senderId}
        });
        if(member?.userId!==req?.user?.id){
            return res.json({message:"You are not allowed to delete this message "});
        }
        if(message?.fileId){
            try {
                imagekit.deleteFile(fileId, function (error) {
                  if (error) {
                    console.log(error);
                  } else {
                    return { message: "file deleted" };
                  }
                });
              } catch (error) {
                console.log(error);
                return { error: error?.toString() };
              }
        }
        await prisma.message.delete({where:{id:req?.body?.message?.id}});
        io.to(req?.body?.message?.conversationId).emit("deleteMessage",message?.id);
        return res.json(message);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString() });
    }
}