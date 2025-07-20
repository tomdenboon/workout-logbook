export function toMap<T, U>(
  array: T[],
  toEntry: (t: T) => [string | number, U],
) {
  return Object.fromEntries(array.map(toEntry));
}

export function filterMap<T, U>(array: T[], f: (t: T) => U | undefined) {
  return array.map(f).filter(Boolean) as U[];
}

export function groupBy<T>(array: T[], groupBy: (item: T) => string) {
  return array.reduce<
    {
      title: string;
      data: T[];
    }[]
  >((acc, item) => {
    const key = groupBy(item);
    if (acc.find((section) => section.title === key)) {
      acc.find((section) => section.title === key)?.data.push(item);
    } else {
      acc.push({ title: key, data: [item] });
    }

    return acc;
  }, []);
}
