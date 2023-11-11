import { TmBuilder } from "../src";

describe("basic", () => {
  test("ensure schema is set", () => {
    expect(new TmBuilder({ scopeName: "source.test" }).build().$schema).toBe(
      "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    );
  });

  test("ensure scope name is set", () => {
    expect(new TmBuilder({ scopeName: "source.test" }).build().scopeName).toBe(
      "source.test",
    );
  });

  describe("append", () => {
    test("default empty pattern array", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" }).build().patterns,
      ).toEqual([]);
    });

    test("append one pattern", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" })
          .append({ name: "comment.line.test", match: /123/.source })
          .build().patterns,
      ).toEqual([{ name: "comment.line.test", match: /123/.source }]);
    });

    test("append multi pattern", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" })
          .append({ name: "comment.line.test", match: /123/.source })
          .append({ name: "comment.block.test", match: /456/.source })
          .build().patterns,
      ).toEqual([
        { name: "comment.line.test", match: /123/.source },
        { name: "comment.block.test", match: /456/.source },
      ]);
    });
  });

  describe("repo", () => {
    test("default undefined repository", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" }).build().repository,
      ).toBeUndefined();
    });

    test("store one pattern", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" })
          .repo("test", { name: "comment.line.test", match: /123/.source })
          .build().repository,
      ).toEqual({
        test: { name: "comment.line.test", match: /123/.source },
      });
    });

    test("store multi pattern", () => {
      expect(
        new TmBuilder({ scopeName: "source.test" })
          .repo("test", { name: "comment.line.test", match: /123/.source })
          .repo("test2", { name: "comment.block.test", match: /456/.source })
          .build().repository,
      ).toEqual({
        test: { name: "comment.line.test", match: /123/.source },
        test2: { name: "comment.block.test", match: /456/.source },
      });
    });
  });
});
