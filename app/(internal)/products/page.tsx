import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getProducts } from '@/lib/data/products';
import { ProductSearchForm } from '../../../components/forms/productSearchForm';
import { ProductsGrid } from './productsGrid';

type Props = {
  searchParams: {
    search?: string;
  };
};

export default async function Products({ searchParams: { search } }: Props) {
  const products = search
    ? await getProducts({ offset: 0, search })
    : await getProducts({ offset: 0 });

  return (
    <>
      <Content className="pb-0">
        <H1>Products</H1>

        <Lead>
          All the festival&apos;s products in one place. Search below to find
          your favourites, find out more information, and add them to your
          wishlist.
        </Lead>

        <ProductSearchForm search={search} />
      </Content>

      <ProductsGrid
        products={products.items}
        count={products.count}
        search={search}
      />
    </>
  );
}
