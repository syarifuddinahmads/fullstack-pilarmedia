import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { handleApiError, handleApiResponse } from '@/utils/api';
import { paginationInfo } from '@/lib/type';

const prisma = new PrismaClient();

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const { start_date, end_date, page = 1, limit = 10 } = (await req.json()) as {
      start_date: string
      end_date: string
      password: string
      page:string
      limit:string
    }

    // Construct the filter based on query parameters
    const filter: any = {};

    if (start_date && end_date) {
      filter.sales_date = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string),
      };
    }


    const totalCount = await prisma.sales.count({ where: filter }); // Hitung total jumlah data

    const totalPages = Math.ceil(totalCount / parseInt(limit as string, 10));

    const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

    const sales = await prisma.sales.findMany({
      where: filter,
      skip: skip,
      take: parseInt(limit as string, 10),
    });

    const paginationInfo: paginationInfo = {
      currentPage: parseInt(page as string, 10),
      totalPages: totalPages,
      totalItems: totalCount,
    };

    return handleApiResponse(res, {sales,paginationInfo}, 200);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}
