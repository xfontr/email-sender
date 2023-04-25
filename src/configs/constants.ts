/** Flags that will be ignored */
export const META_FLAGS: string[] = [];

export const FLAG_FORMAT = (content: string) => `{{ ${content} }}`;

export const ABORT_ON_TEMPLATE_ERROR = true;

export const REQUIRE_SUBJECT = true;

export const BLOCK_SESSION = true;

export const PREFERRED_DB_EXTENSION = "csv";
