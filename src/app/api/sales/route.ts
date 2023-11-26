import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { handleApiError, handleApiResponse } from '@/utils/api';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { start_date, end_date, weekly, daily, monthly, person, product, page = 1, limit = 10 } = req.query || {};

    // Construct the filter based on query parameters
    const filter: any = {};

    if (start_date && end_date) {
      filter.sales_date = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string),
      };
    }

    if (weekly) {
      const weekStart = new Date(weekly as string);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // Assuming week ends on the 7th day

      filter.sales_date = {
        gte: weekStart,
        lte: weekEnd,
      };
    }

    if (daily) {
      filter.sales_date = {
        gte: new Date(daily as string),
        lte: new Date(daily as string),
      };
    }

    if (monthly) {
      const [year, month] = (monthly as string).split('-');
      const monthStart = new Date(parseInt(year), parseInt(month) - 1, 1);
      const monthEnd = new Date(parseInt(year), parseInt(month), 0);

      filter.sales_date = {
        gte: monthStart,
        lte: monthEnd,
      };
    }

    if (person) {
      filter.sales_person_id = parseInt(person as string, 10);
    }

    if (product) {
      filter.product_id = parseInt(product as string, 10);
    }

    const totalCount = await prisma.sales.count({ where: filter }); // Hitung total jumlah data

    const totalPages = Math.ceil(totalCount / parseInt(limit as string, 10));

    const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

    const sales = await prisma.sales.findMany({
      where: filter,
      skip: skip,
      take: parseInt(limit as string, 10),
    });

    const paginationInfo = {
      currentPage: parseInt(page as string, 10),
      totalPages: totalPages,
      totalItems: totalCount,
    };

    return handleApiResponse(res, sales, 200);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}
