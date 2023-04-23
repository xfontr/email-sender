import fs from "fs/promises";
import path from "path";
import tryCatch from "./tryCatch";

const getFile = async (route: string) => {
  const file = await tryCatch(
    fs.readFile.bind(fs),
    path.join(__dirname, route)
  );

  return file[1] ? file[1] : file[0].toString();
};

export default getFile;
