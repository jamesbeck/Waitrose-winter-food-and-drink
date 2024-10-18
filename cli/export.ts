import 'dotenv/config';

import { db } from '@/lib/knex';
import { program } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';

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
      .select(['line_number', 'stand_number'])
      .whereNotNull('stand_number');

    for (const product of products) {
      const url = `${process.env.NEXT_PUBLIC_URL}/products?search=${product.stand_number}`;

      await QRCode.toFile(`${outputDirectory}/${product.line_number}.svg`, url);
      console.log(product.line_number, url);
    }

    db.destroy();
  });

program.parse();
