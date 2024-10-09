import { HamburgerIcon } from '@/components/icons/hamburgerIcon';
import { QrCodeIcon } from '@/components/icons/qrCodeIcon';
import { UserIcon } from '@/components/icons/userIcon';
import { H1 } from '@/components/typography/h1';
import { Button } from '@/components/ui/button';
import { getLoggedInEmail } from '@/lib/auth';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const email = getLoggedInEmail();

  return (
    <html lang="en">
      <body className={gillSans.className}>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <header className="flex p-3 justify-between items-center">
              <Button variant="ghost" className="w-auto">
                <HamburgerIcon />
              </Button>

              <H1>Food &amp; Drink Festival</H1>

              <div className="flex gap-2">
                <Link href="/scan">
                  <Button variant="secondary" size="icon">
                    <QrCodeIcon />
                  </Button>
                </Link>

                <Link href={email ? '/profile' : '/log-in'}>
                  <Button variant="secondary" size="icon">
                    <UserIcon />
                  </Button>
                </Link>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
