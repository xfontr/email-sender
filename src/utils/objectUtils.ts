export const objectFromText = (text: string) => JSON.parse(text);

export const objectKeys = (item: object) => Object.keys(item);

export const objectValues = <T = unknown>(item: object) =>
  Object.values(item) as T[];

export const objectEntries = <T = unknown>(item: object) =>
  Object.entries(item) as [string, T][];
