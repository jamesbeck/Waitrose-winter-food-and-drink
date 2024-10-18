'use client';

import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import useResizeObserver from './hooks';

type Props = {};

export const PdfViewer: React.FC<Props> = (props: Props) => {
  const [numPages, setNumPages] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };

  return (
    <div className="w-full" ref={setContainerRef}>
      <Document
        file="/festival-guide-app.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading={null}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth}
            loading={null}
          />
        ))}
      </Document>
    </div>
  );
};
