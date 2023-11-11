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

<include path="./examples/hello-world/hello-world.test.ts" from="6" to="9" />

will yield:

<include path="./examples/hello-world/test.tmLanguage.json" />

> See: [examples/hello-world](./examples/hello-world).

## Advanced

With [r-compose](https://github.com/DiscreteTom/r-compose), construct readable and maintainable `RegExp`.

<details>
<summary>Click to Expand</summary>
<include path="./examples/r-compose/r-compose.test.ts" from="7" to="44" />
</details>

> See [examples/r-compose](./examples/r-compose).

## [CHANGELOG](./CHANGELOG.md)
