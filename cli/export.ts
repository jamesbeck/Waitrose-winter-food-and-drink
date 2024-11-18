import 'dotenv/config';

import { db } from '@/lib/knex';
import { program } from 'commander';
import { jsPDF } from 'jspdf';
import type { Product } from 'knex/types/tables';
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import './GillSans-normal';

program.name('export');

program
  .command('qr-codes')
  .argument('<output-directory>', 'Directory to save QR codes')
  .action(async (outputDirectory) => {
    // Clear the output directory contents
    for (const file of await fs.readdir(outputDirectory)) {
      await fs.unlink(path.join(outputDirectory, file));
    }

    const products = await db
      .table('products')
      .select(['line_number', 'supplier'])
      .whereNotNull('supplier');

    for (const product of products) {
      const url = `${process.env.NEXT_PUBLIC_URL}/products?search=${product.supplier}`;

      await QRCode.toFile(`${outputDirectory}/${product.line_number}.svg`, url);
      console.log(product.line_number, url);
    }

    db.destroy();
  });

program
  .command('qr-code-pdfs')
  .argument('<output-directory>', 'Directory to save QR code PDFs')
  .action(async (outputDirectory) => {
    // Clear the output directory contents
    for (const file of await fs.readdir(outputDirectory)) {
      await fs.unlink(path.join(outputDirectory, file));
    }

    const products = await db.table('products').whereNotNull('supplier');

    const productsBySupplier = products.reduce((acc, product) => {
      if (!acc[product.supplier]) {
        acc[product.supplier] = [];
      }

      acc[product.supplier].push(product);

      return acc;
    }, {} as Record<string, typeof products>);

    for (const supplier of Object.keys(productsBySupplier)) {
      const products = productsBySupplier[supplier];

      // split products into chunks of 24
      const chunks = products.reduce((acc, product, index) => {
        if (index % 24 === 0) {
          acc.push([]);
        }

        acc[acc.length - 1].push(product);

        return acc;
      }, [] as Product[][]);

      const doc = new jsPDF();
      doc.setFont('GillSans', 'normal');

      const allergens = products
        .map((product) => product.allergens)
        .filter(Boolean) as string[];

      const pageWidth = doc.internal.pageSize.getWidth();

      for (const chunk of chunks) {
        const yMargin = Math.max(
          0,
          Math.min(
            40,
            100 -
              (chunk.length > 12
                ? Math.floor(chunk.length / 2)
                : chunk.length) *
                10 +
              (allergens.length === 0 ? 20 : 0)
          )
        );

        doc.setFontSize(20);
        doc.text(supplier, pageWidth / 2, 20 + yMargin, {
          align: 'center',
          maxWidth: 180,
        });

        doc.setFontSize(32);
        doc.text('SCAN YOUR FAVOURITES', pageWidth / 2, 37 + yMargin, {
          align: 'center',
        });

        doc.setFontSize(12);
        doc.text(
          'If you like what you try on this stand, scan the QR code below using you smartphone, follow the instructions and we will email you a list of all scanned products after the festival.',
          pageWidth / 2,
          50 + yMargin,
          { align: 'center', maxWidth: 150 }
        );

        const url = `${process.env.NEXT_PUBLIC_URL}/products?search=${supplier}`;

        // const svg = await QRCode.toString(url, { type: 'svg' });
        const pngImage = await QRCode.toDataURL(url, {
          type: 'image/png',
          width: 200,
        });

        doc.addImage(pngImage, 'PNG', pageWidth / 2 - 25, 70 + yMargin, 50, 50);

        doc.setFontSize(24);
        doc.text('PRODUCT LIST', pageWidth / 2, 135 + yMargin, {
          align: 'center',
        });

        doc.setFontSize(10);

        // Split to two columns
        if (chunk.length > 12) {
          const columnLength = Math.ceil(chunk.length / 2);

          let doubleHeightBuffer = 0;

          chunk.slice(0, columnLength).forEach((product, index) => {
            const y = 150 + index * 8 + doubleHeightBuffer + yMargin;

            doc.text(product.name, 15, y, {
              maxWidth: 70,
            });
            doc.text(product.normal_price || '', pageWidth / 2 - 8, y, {
              align: 'right',
            });

            if (product.name.length > 45) {
              doubleHeightBuffer += 5;
            }
          });

          doubleHeightBuffer = 0;

          chunk.slice(columnLength).forEach((product, index) => {
            const y = 150 + index * 8 + doubleHeightBuffer + yMargin;

            doc.text(product.name, pageWidth / 2 + 8, y, {
              maxWidth: 70,
            });
            doc.text(product.normal_price || '', pageWidth - 15, y, {
              align: 'right',
            });

            if (product.name.length > 45) {
              doubleHeightBuffer += 5;
            }
          });
        } else {
          chunk.forEach((product, index) => {
            doc.text(product.name, 30, 150 + index * 8 + yMargin);
            doc.text(
              product.normal_price || '',
              pageWidth - 30,
              150 + index * 8 + yMargin,
              {
                align: 'right',
              }
            );
          });
        }

        doc.setFontSize(10);

        if (allergens.length > 0) {
          doc.text(allergens[0], pageWidth / 2, 260, {
            maxWidth: 160,
            align: 'center',
          });
        }

        doc.setFontSize(8);
        doc.text(
          'Product availability, prices and promotions are correct at time of going to press and may vary.',
          pageWidth / 2,
          280,
          { align: 'center', maxWidth: 80 }
        );

        if (chunks.indexOf(chunk) < chunks.length - 1) {
          doc.addPage();
        }
      }

      doc.save(`${outputDirectory}/${supplier.replaceAll('/', '-')}.pdf`);
    }

    db.destroy();
  });

program
  .command('event-qr-code-pdfs')
  .argument('<output-directory>', 'Directory to save QR code PDFs')
  .action(async (outputDirectory) => {
    // Clear the output directory contents
    for (const file of await fs.readdir(outputDirectory)) {
      await fs.unlink(path.join(outputDirectory, file));
    }

    const events = await db.table('events');

    for (const event of events) {
      const products = await db
        .select<Product[]>('products.*')
        .table('products')
        .leftJoin(
          'event_products',
          'products.line_number',
          'event_products.product_line_number'
        )
        .where('event_products.event_id', event.id);

      if (products.length === 0) {
        continue;
      }

      const perPage = 20;

      // split products into chunks of 24
      const chunks = products.reduce((acc, product, index) => {
        if (index % perPage === 0) {
          acc.push([]);
        }

        acc[acc.length - 1].push(product);

        return acc;
      }, [] as Product[][]);

      const doc = new jsPDF();
      doc.setFont('GillSans', 'normal');

      const allergens = products
        .map((product) => product.allergens)
        .filter(Boolean) as string[];

      const pageWidth = doc.internal.pageSize.getWidth();

      for (const chunk of chunks) {
        const yMargin = Math.max(
          0,
          Math.min(
            40,
            100 -
              (chunk.length > 12
                ? Math.floor(chunk.length / 2)
                : chunk.length) *
                10 +
              (allergens.length === 0 ? 20 : 0)
          )
        );

        doc.setFontSize(20);
        doc.text(event.name, pageWidth / 2, 20 + yMargin, {
          align: 'center',
          maxWidth: 180,
        });

        doc.setFontSize(32);
        doc.text('SCAN YOUR FAVOURITES', pageWidth / 2, 37 + yMargin, {
          align: 'center',
        });

        doc.setFontSize(12);
        doc.text(
          'If you like what you see at this event, scan the QR code below using you smartphone, follow the instructions and we will email you a list of all scanned products after the festival.',
          pageWidth / 2,
          50 + yMargin,
          { align: 'center', maxWidth: 150 }
        );

        const url = `${process.env.NEXT_PUBLIC_URL}/events/${event.id}`;

        // const svg = await QRCode.toString(url, { type: 'svg' });
        const pngImage = await QRCode.toDataURL(url, {
          type: 'image/png',
          width: 200,
        });

        doc.addImage(pngImage, 'PNG', pageWidth / 2 - 25, 70 + yMargin, 50, 50);

        doc.setFontSize(24);
        doc.text('PRODUCT LIST', pageWidth / 2, 135 + yMargin, {
          align: 'center',
        });

        doc.setFontSize(10);

        // Split to two columns
        if (chunk.length > Math.floor(perPage / 2)) {
          const columnLength = Math.ceil(chunk.length / 2);

          let doubleHeightBuffer = 0;

          chunk.slice(0, columnLength).forEach((product, index) => {
            const y = 150 + index * 8 + doubleHeightBuffer + yMargin;

            doc.text(product.name, 15, y, {
              maxWidth: 70,
            });
            doc.text(product.normal_price || '', pageWidth / 2 - 8, y, {
              align: 'right',
            });

            if (product.name.length > 43) {
              doubleHeightBuffer += 5;
            }
          });

          doubleHeightBuffer = 0;

          chunk.slice(columnLength).forEach((product, index) => {
            const y = 150 + index * 8 + doubleHeightBuffer + yMargin;

            doc.text(product.name, pageWidth / 2 + 8, y, {
              maxWidth: 70,
            });
            doc.text(product.normal_price || '', pageWidth - 15, y, {
              align: 'right',
            });

            if (product.name.length > 44) {
              doubleHeightBuffer += 5;
            }
          });
        } else {
          chunk.forEach((product, index) => {
            doc.text(product.name, 30, 150 + index * 8 + yMargin);
            doc.text(
              product.normal_price || '',
              pageWidth - 30,
              150 + index * 8 + yMargin,
              {
                align: 'right',
              }
            );
          });
        }

        doc.setFontSize(10);

        if (allergens.length > 0) {
          doc.text(allergens[0], pageWidth / 2, 260, {
            maxWidth: 160,
            align: 'center',
          });
        }

        doc.setFontSize(8);
        doc.text(
          'Product availability, prices and promotions are correct at time of going to press and may vary.',
          pageWidth / 2,
          280,
          { align: 'center', maxWidth: 80 }
        );

        if (chunks.indexOf(chunk) < chunks.length - 1) {
          doc.addPage();
        }
      }

      doc.save(
        `${outputDirectory}/${event.id}-${event.name.replaceAll('/', '-')}.pdf`
      );
    }

    db.destroy();
  });

program.parse();
