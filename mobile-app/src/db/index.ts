import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

export const expo = SQLite.openDatabaseSync('db.db', {
  enableChangeListener: true,
});

const db = drizzle(expo, { schema });
db.run(sql`PRAGMA foreign_keys=ON;`);

export default db;
