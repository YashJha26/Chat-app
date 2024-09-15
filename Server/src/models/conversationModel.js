import { prisma } from "../socket/prisma.js";
import {io} from '../socket/socket.js'
export const createConversation = async (req,res)=>{
    const type = req?.body?.type;
    const members = req?.body?.members;
    try {
        const conversation = await prisma.conversation.create({
            data:{
                type,
                members:{
                    create:members.map((user)=>{return {userId:user?.id}}),
                },
                groupTitle:req?.body?.groupTitle,
                isGroup:req?.body?.isGroup,
            },
            include:{members:{include:{user:true}}}
        });
        conversation?.members?.forEach((member)=>{
            io.to(member?.userId).emit("newConversation",conversation);
        });
        return res.json(conversation);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()});
    }
}

export const getConversation = async (req,res) =>{
    const userId= req?.user?.id;
    const searchValue = req?.body?.searchValue;
    //console.log(searchValue);
    try {
        const conversation = await prisma.conversation.findMany({
            where:{
                AND:[{members:{some:{userId}}}],
                OR: searchValue
                    ?[
                        {groupTitle:{contains:searchValue,mode:"insensitive"}},
                        {
                            members:{
                                some:{
                                    user:{
                                        name:{contains:searchValue,mode:"insensitive"}
                                    }
                                }
                            }
                        },
                        {
                            members:{
                                some:{
                                    user:{
                                        email:{contains:searchValue,mode:"insensitive"}
                                    }
                                }
                            }
                        }

                    ]
                    :undefined,
            },
            include: { members: { include: { user: true } } },
            orderBy: { createdAt: "desc" },
        });
        //console.log(conversation);
        return res.json(conversation);
    } catch (error) {
        
    }
}

export const deleteConversation = async (req,res) =>{
    const member = await prisma.member.findFirst({
        where:{conversationId:req?.body?.conversationId,userId:req?.user?.id},
    });
    if(!member){
        return res.json({message:"You are not allowed to delete the conversation"});
    }
    try {
        const conversation=await prisma.conversation.delete({
            where:{id:req?.body?.conversationId},
            include:{members:{include:{user:true}}},
        });
        conversation?.members?.forEach((member)=>{
            io.to(member?.userId).emit("deleteConversation",conversation?.id);
        });
        return res.json(conversation);
    } catch (error) {
        console.log(error);
        return res.json({error:error?.toString()});
    }
}