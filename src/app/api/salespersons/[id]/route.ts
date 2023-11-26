import { prisma } from "@/lib/prisma";
import { handleApiError, handleApiResponse } from "@/utils/api";
import { NextApiResponse } from "next";

export async function DELETE(req: Request, res: NextApiResponse) {
  try {
    const { sales_person_id } = (await req.json()) as{
      sales_person_id:number
    };
    await prisma.salespersons.delete({
      where: { sales_person_id: Number(sales_person_id) },
    });
    return handleApiResponse(res, null, 204);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}