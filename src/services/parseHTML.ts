import fs from "fs";

const templateRoute = "../data/template.html";

const parseHTML = () => {
  fs.readFileSync(templateRoute);
};

export default parseHTML;
