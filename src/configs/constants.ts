import Extensions from "../types/Extensions";
import { DefaultRoute } from "../utils/defaultRoute";

/** Flags that will be ignored */
export const META_FLAGS: string[] = [];

export const FLAG_FORMAT = (content: string) => `{{ ${content} }}`;

export const ABORT_ON_TEMPLATE_ERROR = true;

export const REQUIRE_SUBJECT = true;

export const BLOCK_SESSION = true;

export const ALLOWED_DB_EXTENSIONS: Extensions[] = ["csv", "json"];

/** If there are two files to choose from */
export const PREFERRED_DB_EXTENSION: Extensions = "csv";

// BASIC FILES

export const TEMPLATE = DefaultRoute("template.html");

/** The file extension MUST be unset only here */
export const CLIENTS = DefaultRoute("clients");

export const DEFAULT_FLAGS = DefaultRoute("master.json");
