import type { Pattern } from "../src";
import {
  InvalidApplyEndPatternLastValueError,
  InvalidCaptureKeyError,
  InvalidDisabledValueError,
  InvalidIncludeError,
  InvalidScopeNameError,
  InvalidSelfReferenceError,
  MissingFieldError,
  NoSuchRepositoryError,
  TmBuilder,
} from "../src";

function helper(props?: {
  scopeName?: string;
  append?: Pattern[];
  repo?: { name: string; pattern: Pattern }[];
}) {
  const builder = new TmBuilder({
    scopeName: props?.scopeName ?? "source.test",
  });
  props?.append?.forEach((p) => builder.append(p));
  props?.repo?.forEach((p) => builder.repo(p.name, p.pattern));

  return () => builder.build({ validate: true });
}

describe("errors", () => {
  describe("invalid scope name", () => {
    test("should throw", () => {
      expect(helper({ scopeName: "123" })).toThrow(InvalidScopeNameError);
    });
    test("should not throw", () => {
      expect(helper({ scopeName: "source.test" })).not.toThrow(
        InvalidScopeNameError,
      );
    });
  });

  describe("invalid capture key", () => {
    const invalidPattern = { captures: { abc: {} } } as Pattern;
    const validPattern = { captures: { 1: {} } } as Pattern;
    const name = "name"; // repo name
    describe("in patterns", () => {
      test("should throw", () => {
        expect(helper({ append: [invalidPattern] })).toThrow(
          InvalidCaptureKeyError,
        );
      });

      test("should not throw", () => {
        expect(() => helper({ append: [validPattern] })).not.toThrow(
          InvalidCaptureKeyError,
        );
      });
    });
    describe("in repository", () => {
      test("should throw", () => {
        expect(helper({ repo: [{ name, pattern: invalidPattern }] })).toThrow(
          InvalidCaptureKeyError,
        );
      });

      test("should not throw", () => {
        expect(helper({ repo: [{ name, pattern: validPattern }] })).not.toThrow(
          InvalidCaptureKeyError,
        );
      });
    });
  });

  describe("invalid disable", () => {
    const invalid = { disabled: 2 } as Pattern;
    const valid0 = { disabled: 0 } as Pattern;
    const valid1 = { disabled: 1 } as Pattern;
    const name = "name"; // repo name
    describe("in patterns", () => {
      test("should throw", () => {
        expect(helper({ append: [invalid] })).toThrow(
          InvalidDisabledValueError,
        );
      });

      test("should not throw", () => {
        expect(helper({ append: [valid0] })).not.toThrow(
          InvalidDisabledValueError,
        );
        expect(helper({ append: [valid1] })).not.toThrow(
          InvalidDisabledValueError,
        );
      });
    });
    describe("in repository", () => {
      test("should throw", () => {
        expect(helper({ repo: [{ name, pattern: invalid }] })).toThrow(
          InvalidDisabledValueError,
        );
      });

      test("should not throw", () => {
        expect(helper({ repo: [{ name, pattern: valid0 }] })).not.toThrow(
          InvalidDisabledValueError,
        );
        expect(helper({ repo: [{ name, pattern: valid1 }] })).not.toThrow(
          InvalidDisabledValueError,
        );
      });
    });
  });

  describe("invalid applyEndPatternLast", () => {
    const invalid = { end: "", applyEndPatternLast: 2 } as Pattern;
    const valid0 = { end: "", applyEndPatternLast: 0 } as Pattern;
    const valid1 = { end: "", applyEndPatternLast: 1 } as Pattern;
    const name = "name"; // repo name
    describe("in patterns", () => {
      test("should throw", () => {
        expect(helper({ append: [invalid] })).toThrow(
          InvalidApplyEndPatternLastValueError,
        );
      });

      test("should not throw", () => {
        expect(helper({ append: [valid0] })).not.toThrow(
          InvalidApplyEndPatternLastValueError,
        );
        expect(helper({ append: [valid1] })).not.toThrow(
          InvalidApplyEndPatternLastValueError,
        );
      });
    });
    describe("in repository", () => {
      test("should throw", () => {
        expect(helper({ repo: [{ name, pattern: invalid }] })).toThrow(
          InvalidApplyEndPatternLastValueError,
        );
      });

      test("should not throw", () => {
        expect(helper({ repo: [{ name, pattern: valid0 }] })).not.toThrow(
          InvalidApplyEndPatternLastValueError,
        );
        expect(helper({ repo: [{ name, pattern: valid1 }] })).not.toThrow(
          InvalidApplyEndPatternLastValueError,
        );
      });
    });
  });

  describe("missing field", () => {
    const invalid = [
      { begin: "" },
      { end: "" },
      { while: "" },
      { contentName: "" },
      { beginCaptures: "" },
      { whileCaptures: "" },
      { endCaptures: "" },
      { applyEndPatternLast: 0 },
    ] as Pattern[];
    const valid = [
      { begin: "", end: "" },
      { begin: "", while: "" },
      { contentName: "", begin: "", end: "" },
      { contentName: "", begin: "", while: "" },
      { beginCaptures: "", begin: "", end: "" },
      { beginCaptures: "", begin: "", while: "" },
      { whileCaptures: "", begin: "", while: "" },
      { endCaptures: "", begin: "", end: "" },
      { applyEndPatternLast: 0, begin: "", end: "" },
    ] as Pattern[];
    const name = "name"; // repo name
    describe("in patterns", () => {
      test("should throw", () => {
        invalid.forEach((i) => {
          expect(helper({ append: [i] })).toThrow(MissingFieldError);
        });
      });

      test("should not throw", () => {
        valid.forEach((v) => {
          expect(helper({ append: [v] })).not.toThrow(MissingFieldError);
        });
      });
    });
    describe("in repository", () => {
      test("should throw", () => {
        invalid.forEach((i) => {
          expect(helper({ repo: [{ name, pattern: i }] })).toThrow(
            MissingFieldError,
          );
        });
      });

      test("should not throw", () => {
        valid.forEach((v) => {
          expect(helper({ repo: [{ name, pattern: v }] })).not.toThrow(
            MissingFieldError,
          );
        });
      });
    });
  });

  describe("no such repository", () => {
    test("should throw", () => {
      expect(
        helper({
          append: [{ include: "#test" }],
          repo: [{ name: "name", pattern: {} }],
        }),
      ).toThrow(NoSuchRepositoryError);
    });

    test("should not throw", () => {
      expect(
        helper({
          append: [{ include: "#name" }],
          repo: [{ name: "name", pattern: {} }],
        }),
      ).not.toThrow(NoSuchRepositoryError);
    });
  });

  describe("invalid self ref", () => {
    describe("in patterns", () => {
      test("should throw", () => {
        expect(
          helper({
            append: [{ include: "$_self" }],
          }),
        ).toThrow(InvalidSelfReferenceError);
      });

      test("should not throw", () => {
        expect(
          helper({
            append: [{ include: "$self" }],
          }),
        ).not.toThrow(InvalidSelfReferenceError);
      });
    });

    describe("in repository", () => {
      test("should throw", () => {
        expect(
          helper({
            repo: [{ name: "", pattern: { include: "$_self" } }],
          }),
        ).toThrow(InvalidSelfReferenceError);
      });

      test("should not throw", () => {
        expect(
          helper({
            repo: [{ name: "", pattern: { include: "$self" } }],
          }),
        ).not.toThrow(InvalidSelfReferenceError);
      });
    });
  });

  describe("invalid include", () => {
    const invalid = [{ include: "123" }] as Pattern[];
    const valid = [{ include: "source.test" }] as Pattern[];
    const name = "name"; // repo name
    describe("in patterns", () => {
      test("should throw", () => {
        invalid.forEach((i) => {
          expect(helper({ append: [i] })).toThrow(InvalidIncludeError);
        });
      });

      test("should not throw", () => {
        valid.forEach((v) => {
          expect(helper({ append: [v] })).not.toThrow(InvalidIncludeError);
        });
      });
    });
    describe("in repository", () => {
      test("should throw", () => {
        invalid.forEach((i) => {
          expect(helper({ repo: [{ name, pattern: i }] })).toThrow(
            InvalidIncludeError,
          );
        });
      });

      test("should not throw", () => {
        valid.forEach((v) => {
          expect(helper({ repo: [{ name, pattern: v }] })).not.toThrow(
            InvalidIncludeError,
          );
        });
      });
    });
  });
});
