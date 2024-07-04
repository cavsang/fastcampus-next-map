// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType, StoreApiResponse } from "../../interface/index";
import prisma from '@/db';
import axios from "axios";

interface reqQueryProp {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>,
) {

  let { page = "", limit = "10", q, district }: reqQueryProp = req.query;
  //const prisma = new PrismaClient();

  if (req.method === 'POST') { //데이터 생성
    const formData = req.body;

    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
    };

    const {data} = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, {headers});

    const result = await prisma.store.create({
      data: {...formData, lat: data?.documents[0]?.y, lng:  data?.documents[0]?.x}
    });

    return res.status(200).json(result); 

  } else if (req.method === 'GET') {
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

      res.status(200).json({
        data: stores,
        page: parseInt(page) < 1 ? 1 : parseInt(page),
        totalCount: totalCount,
        totalPage: totalCount / parseInt(limit),
        pageSize: parseInt(limit)
      });
    } else {

      const { id }: { id?: string } = req.query;

      const stores: StoreType[] = await prisma.store.findMany(
        {
          orderBy: { id: 'asc' },
          where: {
            id: id ? parseInt(id) : {}
          }
        });
      res.status(200).json(id ? stores?.[0] : stores);
    }
  }
}
