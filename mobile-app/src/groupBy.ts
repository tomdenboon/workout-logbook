export default function groupBy<T>(array: T[], groupBy: (item: T) => string) {
  return array.reduce(
    (acc, item) => {
      const key = groupBy(item);
      if (acc.find((section) => section.title === key)) {
        acc.find((section) => section.title === key)?.data.push(item);
      } else {
        acc.push({ title: key, data: [item] });
      }

      return acc;
    },
    [] as {
      title: string;
      data: T[];
    }[],
  );
}
