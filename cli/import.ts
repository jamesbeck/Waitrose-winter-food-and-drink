import 'dotenv/config';

import { db } from '@/lib/knex';
import { filter, getFileStream, map, parseCsv, tap, toDb } from '@/lib/streams';
import { program } from 'commander';
import type { Event } from 'knex/types/tables';
import { pipeline } from 'stream/promises';

type ProductCSVRow = {
  'Line Number': string;
  Room: string;
  'Stand number (int)': string;
  Supplier: string;
  'Image URL': string;
  Products: string;
  'Normal price': string;
  'Link to WR.com': string;
  Allergens: string;
  'Session ID': string;
};

type EventCSVRow = {
  LOCATION: string;
  DAY: string;
  'START TIME': string;
  'END TIME': string;
  IMAGE: string;
  'WHOS ON': string;
  CONTENT: string;
  'TYPE DROP IN PRE BOOK SIGN UP': string;
  FLOOR: string;
  'SESSION ID': string;
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
          line_number: row['Line Number'].trim(),
          name: row.Products ? row.Products.trim() : '',
          image_url:
            row['Image URL'] && row['Image URL'].trim()
              ? row['Image URL'].trim()
              : null,
          supplier: row.Supplier ? row.Supplier.trim() : '',
          room: row.Room || null,
          stand_number:
            row['Stand number (int)'] && row['Stand number (int)'].trim() !== ''
              ? parseInt(row['Stand number (int)'].trim())
              : null,
          normal_price: row['Normal price']
            ? toMoney(row['Normal price'])
            : null,
          description: null,
          website_url:
            row['Link to WR.com'] &&
            row['Link to WR.com'] !== 'Not sold on WR.com'
              ? row['Link to WR.com']
              : null,
          allergens:
            row.Allergens && row.Allergens.trim() ? row.Allergens.trim() : null,
        })),
        tap((row) => console.log(row)),
        toDb(db, 'products', 'line_number')
      );

      await pipeline(
        getFileStream(fileName),
        parseCsv(),
        filter((row: ProductCSVRow) => !!row['Line Number'] && row['Line Number'].match(/^\d+$/) !== null && !!row['Session ID']),
        map((row: ProductCSVRow) =>
          row['Session ID']
            .trim()
            .split(',')
            .map((sessionId) => ({
              event_id: sessionId.trim(),
              product_line_number: row['Line Number'].trim(),
            }))
        ),
        tap((row) => console.log(row)),
        toDb(db, 'event_products')
      )
    } catch (error) {
      console.error(error);
    }

    await db.destroy();
  });

program
  .command('events')
  .argument('<file>', 'File to import')
  .action(async (fileName) => {
    try {
      await pipeline(
        getFileStream(fileName),
        parseCsv(),
        map((row: EventCSVRow): Omit<Event, 'created_at' | 'updated_at'> => ({
            id: row['SESSION ID'].trim(),
            is_masterclass: row.LOCATION.trim().startsWith('Masterclass'),
            type: row['TYPE DROP IN PRE BOOK SIGN UP'].trim(),
            room: row.LOCATION.trim(),
            floor: row.FLOOR.trim(),
            day: row.DAY.trim(),
            start_time: row['START TIME'].trim(),
            end_time: row['END TIME'],
            image_url: row.IMAGE,
            name: row['WHOS ON'],
            description: row.CONTENT,
          })),
        tap((row) => console.log(row)),
        toDb(db, 'events', 'id')
      );
    } catch (error) {
      console.error(error);
    }

    await db.destroy();
  });

program.parse();

const toMoney = (value: string) => value.replace('£ ', '£').trim();
