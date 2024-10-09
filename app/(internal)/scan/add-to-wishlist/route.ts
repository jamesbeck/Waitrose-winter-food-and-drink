import { getProduct } from '@/lib/data/products';
import { addProductToWishlist } from '@/lib/data/wishlist';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const lineNumber = searchParams.get('line_number');

  if (!lineNumber) {
    return redirect('/scan?scanned=false');
  }

  try {
    const product = await getProduct(lineNumber);

    if (!product) {
      return redirect('/scan?scanned=false');
    }

    if (!product.is_wishlisted) {
      await addProductToWishlist(lineNumber);
    }
  } catch (error) {
    console.error(error);

    return redirect('/scan?scanned=false');
  }

  return redirect('/scan?scanned=true');
}
