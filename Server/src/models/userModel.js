import { prisma } from "../socket/prisma.js"


export const getAllUsers = async (req,res) =>{
    const search = req?.body?.search;
    try {
        const allUsers = await prisma.user.findMany({
            where:{
                id:{not:{equals:req?.user?.id}},
                OR:search
                    ?[{email:{contains:search,mode:"insensitive"}},{name:{contains:search,mode:"insensitive"}}]
                    :undefined
            },
            orderBy:{name:'desc'}
        })
        return res.json(allUsers);
    } catch (error) {
        console.log(error);
        return res.json({error:error});
    }
}