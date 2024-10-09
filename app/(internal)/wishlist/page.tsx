export const dynamic = 'force-dynamic';

import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { getWishlist } from '@/lib/data/wishlist';
import { ProductCard } from '../products/productCard';

export default async function Wishlist() {
  const wishlist = await getWishlist();

  return (
    <>
      <Content>
        <H1>My Wishlist</H1>
      </Content>

      <div className="grid grid-cols-2 gap-6">
        {wishlist.items.map((product) => (
          <ProductCard key={product.line_number} product={product} />
        ))}
      </div>
    </>
  );
}
