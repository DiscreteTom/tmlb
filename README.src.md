# tmlb

[![npm](https://img.shields.io/npm/v/tmlb?style=flat-square)](https://www.npmjs.com/package/tmlb)
![coverage](https://img.shields.io/codecov/c/github/DiscreteTom/tmlb?style=flat-square)
![build](https://img.shields.io/github/actions/workflow/status/DiscreteTom/tmlb/publish.yml?style=flat-square)
![license](https://img.shields.io/github/license/DiscreteTom/tmlb?style=flat-square)

TmLanguage builder.

Generate TmLanguage JSON files from TypeScript. Type hint. Avoid escape hell.

Try it online in the [playground](https://dttk.discretetom.com/js-playground?crushed=%28%27dependencieZ%27Atmlb%25400.1Rtmlbx%7EA%2540discretetom%252Fr-cL%25400.2Rr-cLx%255D%7EcellZMPrepareEt%2520IcLWHrCLqconst%2520IkWHtmlbUtrue%7Eid%21V684787179%29%252CMConstructEt%2520zHnew%2520k%257BIscopeNameGFsource.testF*repo%257BFQsFKInameGFQ.line.testFKmatchG__%252F%252F.source*append%257BIincludeGF%2523QsF*build%257BIvalidateGtrueW%257D%253BDX%29%252CMOutputEole.log%257BJSON.stringify%257BzKnullK2%257D%257DDY%29%255D%7EpanelZVX%252CVY%255D%29*W%257Dq%2520%2520%2520%2520.Ahttps%253A%252F%252Fcdn.jsdelivr.net%252Fnpm%252FDUfalse%7Eid%21VE%27%7Ecode%21%27consF%255C%27G%253A%2520H%2520%253D%2520I%28%2520K%252C%2520LomposeM%28%27name%21%27QcommentR.2%252Fdist%252FU%27%7Ereadonly%21V1703W%2520%29X684847765Y724729746Zs%21%255B_%252F%255C%255CkTmBuilderq%255Cr%255Cnx.min.js%27zlanguage%2501zxqk_ZYXWVURQMLKIHGFEDA*_).

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
