import fs from "fs/promises";
import path from "path";
import tryCatch from "./tryCatch";

const getFile = async (route: string) => {
  const file = await tryCatch(
    fs.readFile.bind(fs),
    path.join(__dirname, route)
  );

  return file[0] ? file[0].toString() : file[1];
};

export default getFile;
