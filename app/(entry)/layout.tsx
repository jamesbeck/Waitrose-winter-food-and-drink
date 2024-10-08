import HeaderImage from '@/images/header.png';
import Image from 'next/image';

export default function EntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image src={HeaderImage} alt="header" priority />
      {children}
    </>
  );
}
