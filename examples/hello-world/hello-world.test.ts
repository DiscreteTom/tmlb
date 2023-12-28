import { TmBuilder } from "../../src";
import * as fs from "fs";

const filename = "./examples/hello-world/test.tmLanguage.json";

const language = new TmBuilder({ scopeName: "source.test" })
  .repo("comments", { name: "comment.line.test", match: /\/\//.source })
  .append({ include: "#comments" })
  .build({ validate: true });

const content = JSON.stringify(language, null, 2);

// Usage: ts-node examples/hello-world/hello-world.test.ts
// fs.writeFileSync(filename, content);

test("hello-world", () => {
  expect(content).toBe(
    fs.readFileSync(filename, "utf8").replace(/\r\n/g, "\n"),
  );
});
