import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const session = await getServerSession(req, res, authOptions);

    if(!session?.user){
        return res.status(401);
    }

    if(req.method === 'POST'){
        const {storeId}: {storeId: number}= req.body;

        let like = await prisma.like.findFirst({
            where:{
                storeId,
                userId: session?.user?.id
            }
        })

        if(like){//있다면 삭제, 없다면 생성
            const result = await prisma.like.delete({
                where :{
                    id: like?.id
                }
            })
            return res.status(204).json(result);
        }else{
            const result = await prisma.like.create({
                data:{
                    storeId: storeId,
                    userId: session?.user?.id,
                    /* createAt : new Date()?.toLocaleDateString("ko",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }), */
                }
            });
            return res.status(201).json(result);
        } 
    }else if(req.method === 'GET'){
        //let { page = "", limit = "10"} = req.query;
        const result = await prisma.store.findMany({
            where:{
                likes:{
                    some:{
                        userId: 2
                    }
                }
            }
        });

        return res.status(200).json(result);
    }
}