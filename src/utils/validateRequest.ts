import clearEmptyFields from "./clearEmptyFields";
import { objectEntries } from "./objectUtils";

/**
 *
 * @param toValidate
 * @returns The keys that an empty string as a value.
 * CAUTION: Won't check if the value is falsy, as it could be "false", which is not strictly "empty"
 */
const hasEmptyValues = <T extends object>(toValidate: T): string[] =>
  objectEntries<string>(toValidate)
    .map(([key, value]) => (value !== "" ? undefined : key))
    .filter(clearEmptyFields);

export default hasEmptyValues;
