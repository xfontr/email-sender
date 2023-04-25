# Usage

Place the template.html, flags.json and clients.json fields in a folder called "data", inside the "dist" folder. This way: dist/data/template.html, dist/data/clients.json and so on.

### Master.json

This file serves as a backup/default option for when the clients.json file doesn't have a specific field, but we need it to have a default value no matter what.

For example, we can set a key "subject" with a default value of "Hello there!". If the client n. 1 has no subject, the subject will default to "Hello there!".

It is not mandatory to have a master.json nor to fill all the fields, but it's highly recommended as it can help to keep track of all the fields that are being used.

### Mandatory structure

```ts
{
  email: string;
}
```

### Special non-mandatory fields

```ts
{
  subject: "This is what the message is going to be about";
}
```

### Any other type of data

```ts
/**
 * Fill the json with any other data you want to inject in the template
 */
{
  name: string;
  surname: string;
  age: number;
  introductionText: string;
}
```
