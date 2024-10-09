import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getProducts } from '@/lib/data/products';
import { ProductCard } from './productCard';

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <Content>
        <H1>Products</H1>

        <Lead>
          All the festival's products in one place. Search below to find your
          favourites, find out more information, and add them to your wishlist.
        </Lead>
      </Content>

      <div className="bg-subtle-background p-6 grid grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductCard key={product.line_number} product={product} />
        ))}
      </div>
    </>
  );
}
