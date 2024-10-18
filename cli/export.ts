import 'dotenv/config';

import { db } from '@/lib/knex';
import { program } from 'commander';
import { jsPDF } from 'jspdf';
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

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      doc.setFont('GillSans', 'normal');

      doc.setFontSize(20);
      doc.text(supplier, pageWidth / 2, 40, { align: 'center', maxWidth: 180 });

      doc.setFontSize(32);
      doc.text('SCAN YOUR FAVOURITES', pageWidth / 2, 60, { align: 'center' });

      doc.setFontSize(12);
      doc.text(
        'If you like what you try on this stand, scan the QR code below using you smartphone, follow the instructions and we will email you a list of all scanned products after the festival.',
        pageWidth / 2,
        80,
        { align: 'center', maxWidth: 150 }
      );

      const url = `${process.env.NEXT_PUBLIC_URL}/products?search=${supplier}`;

      // const svg = await QRCode.toString(url, { type: 'svg' });
      const svgImage = await QRCode.toDataURL(url, {
        type: 'image/png',
        width: 200,
      });

      doc.addImage(svgImage, 'PNG', pageWidth / 2 - 25, 100, 50, 50);

      doc.setFontSize(24);
      doc.text('PRODUCT LIST', pageWidth / 2, 165, { align: 'center' });

      doc.setFontSize(12);
      products.forEach((product, index) => {
        doc.text(product.name, 30, 180 + index * 10);
        doc.text(
          product.sale_price || product.normal_price || '',
          pageWidth - 30,
          180 + index * 10,
          {
            align: 'right',
          }
        );
      });

      doc.setFontSize(10);

      const allergens = products
        .map((product) => product.allergens)
        .filter(Boolean)
        .join('. ');

      doc.text(allergens, pageWidth / 2, 230 + products.length * 6, {
        maxWidth: 150,
        align: 'center',
      });

      doc.setFontSize(8);
      doc.text(
        'Product availability, prices and promotions are correct at time of going to press and may vary.',
        pageWidth / 2,
        280,
        { align: 'center', maxWidth: 80 }
      );

      doc.save(`${outputDirectory}/${supplier.replaceAll('/', '-')}.pdf`);
    }

    db.destroy();
  });

program.parse();
