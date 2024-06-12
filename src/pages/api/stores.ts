// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType, StoreApiResponse } from "../../interface/index";
import {PrismaClient} from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse>,
) {
    let {page = "1"}:{page?: string} = req.query;
    const pageSize = 10;

    const prisma = new PrismaClient();
    const totalCount = await prisma.store.count();
    const stores:StoreType[] = await prisma.store.findMany({
      orderBy:{id: "asc"},
      take: pageSize,
      skip: (parseInt(page) < 1 ? 0 : (parseInt(page) -1)) * 10
    });

  res.status(200).json({
    data: stores,
    page: parseInt(page) < 1 ? 1 : parseInt(page),
    totalCount :totalCount,
    totalPage: totalCount / pageSize,
    pageSize: pageSize
  });
}
