import { TmBuilder } from "../../src";
import { compose } from "@discretetom/r-compose";

const content = new TmBuilder({ scopeName: "source.test" })
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
  .build();

console.log(JSON.stringify(content, null, 2));
