import { prisma } from "@/lib/prisma";
import { handleApiError, handleApiResponse } from "@/utils/api";
import { NextApiResponse } from "next";

export async function DELETE(req: Request, res: NextApiResponse) {
  try {
    const { product_id } = (await req.json()) as{
      product_id:number
    };
    await prisma.products.delete({
      where: { product_id: Number(product_id) },
    });
    return handleApiResponse(res, null, 204);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}