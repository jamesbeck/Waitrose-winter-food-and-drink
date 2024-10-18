import { QrCodeIcon } from '@/components/icons/qrCodeIcon';
import { UserIcon } from '@/components/icons/userIcon';
import { H1 } from '@/components/typography/h1';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/data/user';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';
import { Menu } from './menu';

const gillSans = localFont({
  src: [
    {
      path: '../fonts/GillSansNovaJL-Light.woff2',
      weight: '200',
    },
    {
      path: '../fonts/GillSansNovaJL-Medium.woff2',
      weight: '400',
    },
    {
      path: '../fonts/GillSansNovaJL-SemiBold.woff2',
      weight: '600',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Food & Drink Festival',
  description: 'Waitrose Winter Food & Drink Festival',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={gillSans.className}>
        <div className="flex justify-center select-none">
          <div className="w-full max-w-md flex flex-col min-h-svh">
            <header className="fixed w-full max-w-md bg-white z-40">
              <div className="flex p-3 justify-between items-center h-20">
                <Menu user={user} />

                <H1>
                  <Link href="/home">Food &amp; Drink Festival</Link>
                </H1>

                <div className="flex gap-2">
                  <Button variant="secondary" size="icon" asChild>
                    <Link href="/scan">
                      <QrCodeIcon />
                    </Link>
                  </Button>

                  <Button variant="secondary" size="icon" asChild>
                    <Link href={user ? '/profile' : '/log-in'}>
                      <UserIcon />
                    </Link>
                  </Button>
                </div>
              </div>
            </header>

            <div className="mt-20">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
