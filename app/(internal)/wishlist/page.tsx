import { ProductSearchForm } from '@/components/forms/productSearchForm';
import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Lead } from '@/components/typography/lead';
import { getWishlist } from '@/lib/data/wishlist';
import { WishlistGrid } from './wishlistGrid';

type Props = {
  searchParams: {
    search?: string;
  };
};

export default async function Wishlist({ searchParams: { search } }: Props) {
  const wishlist = search
    ? await getWishlist({ offset: 0, search })
    : await getWishlist({ offset: 0 });

  return (
    <>
      <Content className="pb-0">
        <H1>My Wishlist</H1>

        <Lead>
          Here is your wishlist so far. All of your favourite products in one
          place! Use the search to find filter the list.
        </Lead>

        <ProductSearchForm search={search} />
      </Content>

      <WishlistGrid products={wishlist.items} count={wishlist.count} />
    </>
  );
}
