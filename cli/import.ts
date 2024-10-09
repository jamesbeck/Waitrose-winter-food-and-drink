import 'dotenv/config';

import { db } from '@/lib/knex';
import { filter, getFileStream, map, parseCsv, tap, toDb } from '@/lib/streams';
import { program } from 'commander';
import { pipeline } from 'stream/promises';

type ProductCSVRow = {
  'Line Number': string;
  Room: string;
  Supplier: string;
  'Image URL': string;
  Products: string;
  'Normal price': string;
  'Sale price': string;
  Unit: string;
  'Link to WR.com': string;
};

program.name('import');

program
  .command('products')
  .argument('<file>', 'File to import')
  .action(async (fileName) => {
    try {
      await pipeline(
        getFileStream(fileName),
        parseCsv(),
        filter(
          (row: ProductCSVRow) =>
            !!row['Line Number'] && row['Line Number'].match(/^\d+$/) !== null
        ),
        map((row: ProductCSVRow) => ({
          line_number: row['Line Number'],
          name: row.Products ? row.Products.trim() : '',
          image_url: row['Image URL'] || null,
          supplier: row.Supplier ? row.Supplier.trim() : '',
          room: row.Room || null,
          normal_price: row['Normal price']
            ? toMoney(row['Normal price'])
            : null,
          sale_price: row['Sale price'] ? toMoney(row['Sale price']) : null,
          unit: row.Unit || null,
          description: null,
          website_url:
            row['Link to WR.com'] &&
            row['Link to WR.com'] !== 'Not sold on WR.com'
              ? row['Link to WR.com']
              : null,
        })),
        tap((row) => console.log(row)),
        toDb(db, 'products', 'line_number')
      );
    } catch (error) {
      console.error(error);
    }

    await db.destroy();
  });

program.parse();

const toMoney = (value: string) => value.replace('£ ', '£').trim();
