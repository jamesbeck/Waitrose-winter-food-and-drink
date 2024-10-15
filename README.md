This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## CLI

### Product Import

The product import will override any existing values that have the same line number. Any products without line numbers will be ignored.

For convenience the `data` directory in the project is Git ignored.

```bash
npm run import products {path_to_csv}
```

e.g. assuming a file in the `data` directory of the project

```bash
npm run import products "data/WWF24 APP MASTER SHEET - PRODUCT.csv"
```

### Events Import

The events import will override any existing values that have the same combination of room, day and time (these are combined to make the ID). Any events without values in these columns will be ignored.

For convenience the `data` directory in the project is Git ignored.

```bash
npm run import events {path_to_csv}
```

e.g. assuming a file in the `data` directory of the project

```bash
npm run import events "data/WWF24 APP MASTER SHEET - WHAT'S ON .csv"
```

### QR Code Export

NOTE: The output directory must already exist.

For convenience the `qr-codes` directory in the project is Git ignored.

```bash
npm run export qr-codes {output_directory}
```

e.g. assuming the directory `qr-codes` already exists

```bash
npm run export qr-codes ./qr-codes
```
