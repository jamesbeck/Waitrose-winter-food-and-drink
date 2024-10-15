import { EmptyMessage } from '@/components/content/emptyMessage';
import { Content } from '@/components/layout/content';
import { DataContainer } from '@/components/layout/dataContainer';
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

      {wishlist.count === 0 ? (
        <DataContainer className="grow p-12 content-center">
          <EmptyMessage
            heading="You have no items in your wishlist"
            message="To add items, please head over to the products section and browse the available products"
          />
        </DataContainer>
      ) : (
        <DataContainer>
          <div className="grid grid-cols-2 gap-6">
            {wishlist.items.map((product) => (
              <ProductCard key={product.line_number} product={product} />
            ))}
          </div>
        </DataContainer>
      )}
    </>
  );
}
