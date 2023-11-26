import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
  }
  

export function handleApiResponse<T>(
  res: NextApiResponse,
  data: T,
  status: number = 200,
  message?: string
) {
  const response: ApiResponse<T> = {
    status: 'success',
    message,
    data,
  };

  return new NextResponse(JSON.stringify(response), { status });
}

export function handleApiError(res: NextApiResponse, status: number = 500, message?: string) {
  const response: ApiResponse<undefined> = {
    status: 'error',
    message: message || 'Internal Server Error',
  };

  return new NextResponse(JSON.stringify(response), { status });
}
