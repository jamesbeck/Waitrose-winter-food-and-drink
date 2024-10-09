import 'dotenv/config';

import { db } from '@/lib/knex';
import { program } from 'commander';
import QRCode from 'qrcode';

program.name('export');

program
  .command('qr-codes')
  .argument('<output-directory>', 'Directory to save QR codes')
  .action(async (outputDirectory) => {
    const products = await db.table('products').select('line_number');

    for (const product of products) {
      const url = `${process.env.NEXT_PUBLIC_URL}/scan/add-to-wishlist?line_number=${product.line_number}`;

      await QRCode.toFile(`${outputDirectory}/${product.line_number}.svg`, url);
      console.log(product.line_number, url);
    }

    db.destroy();
  });

program.parse();
