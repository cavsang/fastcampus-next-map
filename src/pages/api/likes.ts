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
        let { page = "", limit = "10"}:any = req.query;

        const totalCount = await prisma.like.count();

        const result = await prisma.like.findMany({
            orderBy: { createdAt: "asc" },
            where:{
                userId: session?.user?.id
            },
            include:{
                store: true
            },
            take: parseInt(limit as string),
            skip: (parseInt(page as string) < 1 ? 0 : (parseInt(page as string) - 1)) * 10
        });
        return res.status(200).json({
            result: result,
            totalCount: totalCount,
            totalPage: totalCount / parseInt(limit),
            page: parseInt(page) < 1 ? 1 : parseInt(page),
            pageSize: parseInt(limit)
        });
    }
}