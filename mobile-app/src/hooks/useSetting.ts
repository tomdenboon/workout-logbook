import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import db from 'db';
import { eq } from 'drizzle-orm';
import * as schema from 'db/schema';

export function useSetting<T = string>(key: string, defaultValue: T): T {
  const { data: setting } = useLiveQuery(
    db.query.settings.findFirst({
      where: eq(schema.settings.key, key),
    }),
  );

  return (setting?.value as T) ?? defaultValue;
}
