# Usage

Place the template.html, flags.json and clients.json/clients.csv fields in a folder called "data", inside the "dist" folder. This way: dist/data/template.html, dist/data/clients.json and so on.

### Master.json

This file serves as a backup/default option for when the clients.json file doesn't have a specific field, but we need it to have a default value no matter what.

For example, we can set a key "subject" with a default value of "Hello there!". If the client n. 1 has no subject, the subject will default to "Hello there!".

It is not mandatory to have a master.json nor to fill all the fields, but it's highly recommended as it can help to keep track of all the fields that are being used.

### Clients.json | Clients.csv

**Recommended use:** Work on your database with any grid editor such as Excel, Numbers, etc. Export it as a CSV, save it as "clients.csv" and place it in the corresponding folder.

**Alternatives:** You can have both json and csv files in the data folder. By default, the app will try to retrieve the csv and if it fails it will go for the json.

**Data format:** Each data field, such as "email", "subject", "name", and any other field you'd like to introduce, should be written in camelCase. This means: the first word always in lower case. Any word after that is to be capitalized. Example: "introductionMessage".

### Mandatory structure

```ts
/**
 * Must have fields
 */
{
  email: string,
  // Example { "email" : "johnDoe@gmail.com" }
  subject: string
  // Example { "subject" : "This is what the message is going to be about" }
}
```

### Any other type of data

```ts
/**
 * Fill the json/csv with any other data you want to inject in the template
 */
{
  "name": string;
  "surname": string;
  "age": number;
  "introductionMessage": string;
}
```
