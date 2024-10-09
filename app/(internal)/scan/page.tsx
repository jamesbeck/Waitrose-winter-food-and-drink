'use client';

import { Content } from '@/components/layout/content';
import { H1 } from '@/components/typography/h1';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Scan() {
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
    </>
  );
}
