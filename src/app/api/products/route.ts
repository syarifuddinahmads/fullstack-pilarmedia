import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { handleApiError, handleApiResponse } from '@/utils/api';
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.products.findMany();
    return handleApiResponse(res, products);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const {product_name,product_description,product_price} =(await req.json()) as{
      product_name:string
      product_description:string
      product_price:number
    };

    const newProduct = await prisma.products.create({
      data: {
        product_name,
        product_description,
        product_price
      },
    });

    // Check if the created product is null or undefined
    if (!newProduct) {
      return handleApiError(res, 500, 'Failed to create the product');
    }

    return handleApiResponse(res, { status: 201, product: newProduct });
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    const {product_id,product_name,product_description,product_price} =(await req.json()) as{
      product_id:number
      product_name:string
      product_description:string
      product_price:number
    };    const updatedProduct = await prisma.products.update({
      where: { product_id: product_id },
      data: {
        product_id,
        product_name,
        product_description,
        product_price,
      },
    });
    return handleApiResponse(res, updatedProduct);
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}


// New function to get details of a single product
export async function GETById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const product = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });

    if (!product) {
      return handleApiError(res, 404, 'Product not found');
    }

    return handleApiResponse(res, { product });
  } catch (error) {
    console.error(error);
    return handleApiError(res);
  }
}
