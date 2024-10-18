import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('./PDFViewer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function Guide() {
  return <PDFViewer />;
}
