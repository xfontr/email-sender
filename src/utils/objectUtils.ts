export const objectFromText = <T = object>(text: string) =>
  JSON.parse(text) as T;

export const objectKeys = (item: object) => Object.keys(item);

export const objectValues = <T = unknown>(item: object) =>
  Object.values(item) as T[];

export const objectEntries = <T = unknown, I extends unknown = object>(
  item: I
) => Object.entries(item) as [string, T][];
