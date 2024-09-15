import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient();

prisma.$connect().then(()=>{
    console.log("DB connected ");
}).catch((err)=>{
    console.log("DB not connected",err);
})