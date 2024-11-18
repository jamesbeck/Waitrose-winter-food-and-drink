import { parse } from 'fast-csv';
import { createReadStream, statSync } from 'fs';
import type { Knex } from 'knex';
import { Transform, Writable } from 'stream';

export const getFileStream = (filePath: string) => {
  if (!statSync(filePath, { throwIfNoEntry: false })) {
    throw new Error(`File "${filePath}" does not exist`);
  }

  return createReadStream(filePath);
};

export const parseCsv = () =>
  parse({
    headers: (headers) => headers.map((header) => header?.trim()),
  });

export const map = <T, U>(f: (chunk: T) => U) =>
  new Transform({
    objectMode: true,
    transform(chunk: T, _encoding, callback) {
      this.push(f(chunk));
      callback();
    },
  });

export const filter = <T>(f: (chunk: T) => boolean) =>
  new Transform({
    objectMode: true,
    transform(chunk: T, _encoding, callback) {
      if (f(chunk)) {
        this.push(chunk);
      }
      callback();
    },
  });

export const tap = <T>(sideEffect: (chunk: T) => void) =>
  new Transform({
    objectMode: true,
    transform(chunk: T, _encoding, callback) {
      sideEffect(chunk);

      this.push(chunk);

      callback();
    },
  });

export const toDb = (db: Knex, tableName: string, keyColumn?: string) =>
  new Writable({
    objectMode: true,
    async write(data: Record<string, unknown>, _encoding, callback) {
      try {
        const query = db(tableName).insert(data);

        if (keyColumn) {
          query.onConflict(keyColumn).merge();
        }

        await query;
        callback();
      } catch (error) {
        callback(error as Error);
      }
    },
  });
