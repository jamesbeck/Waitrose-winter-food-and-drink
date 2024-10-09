import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getProducts } from '@/lib/data/products';
import { ProductsGrid } from './productsGrid';

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <Content>
        <H1>Products</H1>

        <Lead>
          All the festival&apos;s products in one place. Search below to find
          your favourites, find out more information, and add them to your
          wishlist.
        </Lead>
      </Content>

      <ProductsGrid products={products.items} count={products.count} />
    </>
  );
}
