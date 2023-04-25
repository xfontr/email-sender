export const objectFromText = <T = object>(text: string) =>
  JSON.parse(text) as T;

export const objectFromBiDimensionalList = <T = object>(
  list: string[][] | string
): T =>
  typeof list === "string"
    ? objectFromText(list)
    : (list.reduce(
        (finalGrid, currentRow, row) =>
          row === 0
            ? []
            : [
                ...finalGrid,
                currentRow.reduce(
                  (finalRow, value, index) => ({
                    ...finalRow,
                    [list[0][index]]: value,
                  }),
                  {}
                ),
              ],
        []
      ) as T);

export const objectKeys = (item: object) => Object.keys(item);

export const objectValues = <T = unknown>(item: object) =>
  Object.values(item) as T[];

export const objectEntries = <T = unknown, I extends unknown = object>(
  item: I
) => Object.entries(item) as [string, T][];
