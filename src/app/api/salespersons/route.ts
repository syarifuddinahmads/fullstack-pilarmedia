import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { handleApiError, handleApiResponse } from '@/utils/api';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const salespersons = await prisma.salespersons.findMany();
    return handleApiResponse(res, salespersons);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { sales_person_name, sales_person_phone, sales_person_address } = (await req.json()) as{
      sales_person_name:string
      sales_person_address:string
      sales_person_phone:string
    };
    const newSalesperson = await prisma.salespersons.create({
      data: {
        sales_person_name,
        sales_person_phone,
        sales_person_address,
      },
    });
    return handleApiResponse(res, newSalesperson, 201);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    const { sales_person_id, sales_person_name, sales_person_phone, sales_person_address } =(await req.json()) as{
      sales_person_name:string
      sales_person_address:string
      sales_person_phone:string
      sales_person_id:number
    };
    const updatedSalesperson = await prisma.salespersons.update({
      where: { sales_person_id: sales_person_id },
      data: {
        sales_person_name,
        sales_person_phone,
        sales_person_address,
      },
    });
    return handleApiResponse(res, updatedSalesperson);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}

// New function to get details of a single salesperson
export async function GETById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const salesperson = await prisma.salespersons.findUnique({
      where: { sales_person_id: Number(id) },
    });

    if (!salesperson) {
      return handleApiError(res, 404, 'Salesperson not found');
    }

    return handleApiResponse(res, { salesperson });
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}
