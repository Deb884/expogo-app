import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabase } from 'expo-sqlite';

let database: SQLiteDatabase | null = null;

function openDatabase(): SQLiteDatabase {
  if (Platform.OS === 'web' && typeof window === 'undefined') {
    throw new Error('SQLite is not available on the server.');
  }
  database = database ?? SQLite.openDatabaseSync('pos_inventory.db');
  return database;
}

export const db = new Proxy({} as SQLiteDatabase, {
  get(_target, prop: string | symbol) {
    if (prop === 'then' || prop === 'toJSON' || prop === Symbol.toPrimitive) {
      return undefined;
    }
    const instance = openDatabase();
    const value = (instance as unknown as Record<string | symbol, unknown>)[
      prop
    ];
    return typeof value === 'function'
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

export function initDatabase() {
  const instance = openDatabase();
  instance.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
  `);

  const countRow = instance.getFirstSync<{ count: number }>(
    'SELECT COUNT(*) as count FROM products;'
  );

  if (countRow && countRow.count === 0) {
    instance.runSync(
      `INSERT INTO products 
      (name, category, price, stock)
      VALUES (?, ?, ?, ?),
             (?, ?, ?, ?),
              (?, ?, ?, ?),
              (?, ?, ?, ?),
              (?, ?, ?, ?);`,
      [
        'Fresh Davao Bananas',
        'Produce',
        65.0,
        48,

        'Mati Brown Rice (5kg)',
        'Grains',
        280.0,
        25,

        'Coconut Virgin Oil',
        'Beverages',
        150.0,
        14,

        'Davao Chocolate Bar',
        'Snacks',
        85.0,
        32,

        'Bukidnon Arabica Coffee',
        'Beverages',
        195.0,
        18,
      ]
    );
  }
}