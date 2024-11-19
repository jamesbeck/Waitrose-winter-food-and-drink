import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import PlaceholderImage from '@/images/placeholder.jpg';
import { getProduct } from '@/lib/data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { WishlistButton } from '../../../../components/buttons/wishlistButton';
import { WishlistIconButton } from '../../../../components/buttons/wishlistIconButton';
import { BackButton } from './backButton';
import { ViewOnWaitroseButton } from './viewOnWaitroseButton';

type Props = {
  params: {
    lineNumber: string;
  };
};

export default async function Products({ params: { lineNumber } }: Props) {
  const product = await getProduct(lineNumber);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="relative p-6">
        <BackButton />

        <WishlistIconButton product={product} />

        <div className="w-full h-96 relative">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100vw, 50vh"
            />
          ) : (
            <Image
              src={PlaceholderImage}
              alt={product.name}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100vw, 50vh"
            />
          )}
        </div>
      </div>
      <Content className="relative text-left">
        <div className="flex space-x-3">
          <div className="grow">
            <H1 className="text-left">{product.name}</H1>
          </div>

          <div className="leading-7">
            {product.normal_price && (
              <div className="text-right">{product.normal_price}</div>
            )}
          </div>
        </div>
        {product.website_url && (
          <ViewOnWaitroseButton url={product.website_url} />
        )}
        <WishlistButton product={product} variant={'outline'} />
      </Content>
    </>
  );
}
