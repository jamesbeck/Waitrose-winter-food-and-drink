'use client';

import dynamic from 'next/dynamic';

export const LazyPdfViewer = dynamic(
  () => import('./pdfViewer').then((mod) => mod.PdfViewer),
  {
    ssr: false,
    // loading: () => <p>Loading...</p>,
  }
);
