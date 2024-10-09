'use client';

import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  searchParams: {
    scanned: string;
  };
};

export default function Scan({ searchParams: { scanned } }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    for (const code of detectedCodes) {
      if (code.rawValue.match(/^https?:\/\//)) {
        redirect(code.rawValue);
      }
    }

    setError('No valid QR code detected, please try again.');
  };

  return (
    <>
      <div className="h-[100vw]">
        <Scanner onScan={handleScan} />
      </div>

      <Content>
        <H1>Scan QR Code</H1>

        {error && <Alert variant="destructive">{error}</Alert>}

        <Button onClick={() => router.back()}>Cancel</Button>

        <p className="font-light">Issue connecting to camera?</p>
        <strong className="font-medium">
          Please ensure permissions are accepted.
        </strong>
      </Content>

      <Dialog
        open={scanned === 'true'}
        onOpenChange={() => router.push('/scan')}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product added to your wishlist!</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button asChild>
              <Link href="/wishlist">Go to wishlist</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/scan" passHref>
                Scan another item
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={scanned === 'false'}
        onOpenChange={() => router.push('/scan')}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product not added to your wishlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Alert variant="destructive">
              There was a problem adding the product to your wishlist. Please
              try again.
            </Alert>

            <Button asChild>
              <Link href="/scan">Try again</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
