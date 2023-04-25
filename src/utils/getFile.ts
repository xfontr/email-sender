import fs from "fs/promises";
import path from "path";
import tryCatch from "./tryCatch";
import {
  ALLOWED_DB_EXTENSIONS,
  PREFERRED_DB_EXTENSION,
} from "../configs/constants";
import Extensions from "../types/Extensions";
import { DEFAULT_ROUTE } from "./defaultRoute";

const getFile = async (route: string) => {
  const file = await tryCatch(
    fs.readFile.bind(fs),
    path.join(__dirname, route),
    "utf8"
  );

  return file[1] ? file[1] : file[0].toString();
};

export const getFileWithoutExtension = async (
  route: string,
  fileName: string
) => {
  const files = await fs.readdir(path.join(__dirname, DEFAULT_ROUTE));

  const matchingFiles = files.filter((file) => file.startsWith(fileName));

  if (!matchingFiles.length) return false;

  if (
    matchingFiles.find(
      (file) => path.extname(file) === `.${PREFERRED_DB_EXTENSION}`
    )
  ) {
    const file = await getFile(path.join(`${route}.${PREFERRED_DB_EXTENSION}`));
    return file;
  }

  const matchingExtension = matchingFiles.filter((file) =>
    ALLOWED_DB_EXTENSIONS.includes(
      path.extname(file).replace(".", "") as Extensions
    )
  );

  if (!matchingExtension?.length || matchingExtension.length > 1) return false;

  const file = await getFile(
    path.join(`${route}${path.extname(matchingExtension[0])}`)
  );

  return file;
};

export default getFile;
