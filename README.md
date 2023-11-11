# tmlb

[![npm](https://img.shields.io/npm/v/tmlb?style=flat-square)](https://www.npmjs.com/package/tmlb)
![coverage](https://img.shields.io/codecov/c/github/DiscreteTom/tmlb?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/DiscreteTom/tmlb/publish.yml?style=flat-square)
![license](https://img.shields.io/github/license/DiscreteTom/tmlb?style=flat-square)

TmLanguage builder.

Generate TmLanguage JSON files from TypeScript. Type hint. Avoid escape hell.

## Install

```bash
yarn add tmlb
```

## Basic Usage



```ts
const language = new TmBuilder({ scopeName: "source.test" })
  .repo("comments", { name: "comment.line.test", match: /\/\//.source })
  .append({ include: "#comments" })
  .build({ validate: true });
```



will yield:



```json
{
  "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  "scopeName": "source.test",
  "patterns": [
    {
      "include": "#comments"
    }
  ],
  "repository": {
    "comments": {
      "name": "comment.line.test",
      "match": "\\/\\/"
    }
  }
}
```



> See: [examples/hello-world](./examples/hello-world).

## Advanced

With [r-compose](https://github.com/DiscreteTom/r-compose), construct readable and maintainable `RegExp`.

<details><summary>Click to Expand</summary>

```ts
const language = new TmBuilder({ scopeName: "source.test" })
  .append({
    name: "comment.line.double-slash.test",
    match: compose(({ concat, escape, select }) =>
      concat(
        escape("//"),
        /./, // in non-multiline mode, the /./ doesn't match the /\n/
        select(/\n/, /$/),
      ),
    ).source,
  })
  .append({
    name: "comment.block.test",
    begin: compose(({ escape }) => escape("/*")).source,
    end: compose(({ escape, select }) => select(escape("*/"), /$/)).source,
  })
  .append({
    name: "keyword.other.test",
    match: compose(({ concat, select }) =>
      concat(/\b/, select("if", "else", "while"), /\b/),
    ).source,
  })
  .append({
    name: "string.quoted.double.test",
    match: compose(({ concat, any, select, not }) =>
      concat(
        /"/,
        any(
          select(
            /\\./, // any escaped character
            not(concat(/\\/, /"/)), // any char except a backslash or the close quote
          ),
        ),
        select(/"/, /$/),
      ),
    ).source,
  })
  .build({ validate: true });
```

</details>

> See [examples/r-compose](./examples/r-compose).

## [CHANGELOG](./CHANGELOG.md)
