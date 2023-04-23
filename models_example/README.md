# Usage

Place the template.html, flags.json and clients.json fields in a folder called "data", inside the "dist" folder. This way: dist/data/template.html, dist/data/clients.json and so on.

### Mandatory structure

```ts
{
  subject: string;
  contactData: {
    email: string;
  }
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
