// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StoreType } from "@/interface/index";
import prisma from '@/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as string;
    const limit = searchParams.get("limit") as string;
    const q = searchParams.get("q") as string;
    const district = searchParams.get("district") as string;
    const id = searchParams.get("id") as string;

    const session = await getServerSession(authOptions);

    if (page) {
        const totalCount = await prisma.store.count();
        const stores: StoreType[] = await prisma.store.findMany({
            orderBy: { id: "asc" },
            where: {
                AND: [
                    {
                        address: {
                            contains: district ? district : ""
                        }
                    }, {
                        name: {
                            contains: q ? q : ""
                        }
                    }
                ]
            },
            take: parseInt(limit),
            skip: (parseInt(page) < 1 ? 0 : (parseInt(page) - 1)) * 10
        });

        return NextResponse.json({
            data: stores,
            page: parseInt(page) < 1 ? 1 : parseInt(page),
            totalCount: totalCount,
            totalPage: totalCount / parseInt(limit),
            pageSize: parseInt(limit)
        },{
            status: 200
        });
    } else {

        const stores: StoreType[] = await prisma.store.findMany(
            {
                orderBy: { id: 'asc' },
                where: {
                    id: id ? parseInt(id) : {}
                },
                include: {
                    likes: {
                        where: session ? { userId: session.user.id } : {}
                    }
                }
            });

        //res.status(200).json(id ? stores?.[0] : stores);
        return NextResponse.json(id ? stores?.[0] : stores,{status: 200});

    }
}

export async function POST(req: Request){
    const formData = await req.json();
    const headers = {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
    };

    const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers });

    const result = await prisma.store.create({
        data: { ...formData, lat: data?.documents[0]?.y, lng: data?.documents[0]?.x }
    });

    return NextResponse.json(result,{status: 201});
}

export async function PUT(req:Request){
    const formData = await req.json();
    const headers = {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
    };

    const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers });

    const result = await prisma.store.update({
        where: {
            id: formData?.id
        },
        data: { ...formData, lat: data?.documents[0]?.y, lng: data?.documents[0]?.x }
    });
    return NextResponse.json({result},{status: 200});
}


export async function DELETE(req:Request){
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    const delStore  = await prisma.store.delete({
        where:{
            id: parseInt(id as string)
        }
    });
    return NextResponse.json(delStore,{status: 200});
}

