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

  if (!setting?.value) {
    return defaultValue;
  }

  if (typeof defaultValue === 'number') {
    const numValue = Number(setting.value);
    return (isNaN(numValue) ? defaultValue : numValue) as T;
  }

  return setting.value as T;
}
