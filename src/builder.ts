import {
  InvalidScopeNameError,
  InvalidCaptureKeyError,
  InvalidDisabledValueError,
  InvalidApplyEndPatternLastValueError,
  MissingFieldError,
  NoSuchRepositoryError,
  InvalidSelfReferenceError,
  InvalidIncludeError,
} from "./error";
import type { TmLanguage, Grammar, Pattern } from "./tmLanguage";

export class TmBuilder {
  readonly scopeName: TmLanguage["scopeName"];
  readonly repository: NonNullable<Grammar["repository"]>;
  readonly patterns: Pattern[];

  constructor(props: Pick<TmLanguage, "scopeName">) {
    this.scopeName = props.scopeName;
    this.repository = {};
    this.patterns = [];
  }

  append(pattern: Pattern) {
    this.patterns.push(pattern);
    return this;
  }

  repo(name: string, pattern: Pattern) {
    this.repository[name] = pattern;
    return this;
  }

  build(options?: {
    /**
     * If `true`, will throw an error if any patterns are invalid.
     * @default false
     */
    validate?: boolean;
  }): TmLanguage {
    const res = {
      $schema:
        "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
      scopeName: this.scopeName,
      patterns: this.patterns,
      repository: Object.keys(this.repository).length
        ? this.repository
        : undefined,
    };

    const validate = options?.validate ?? false;
    if (!validate) return res;

    // validate scope name
    if (!res.scopeName.match(/^(text|source)(\.[\w0-9-]+)+$/))
      throw new InvalidScopeNameError(res.scopeName);

    // validate all patterns
    res.patterns.concat(Object.values(res.repository ?? {})).forEach((p) => {
      // validate capture key
      Object.keys(p.captures ?? {}).forEach((k) => {
        if (!k.match(/^[0-9]+$/)) throw new InvalidCaptureKeyError(p, k);
      });

      // validate disabled
      if (p.disabled !== undefined && ![0, 1].includes(p.disabled))
        throw new InvalidDisabledValueError(p, p.disabled);

      // validate applyEndPatternLast
      if (
        p.applyEndPatternLast !== undefined &&
        ![0, 1].includes(p.applyEndPatternLast)
      )
        throw new InvalidApplyEndPatternLastValueError(
          p,
          p.applyEndPatternLast,
        );

      // validate missing fields
      if (p.begin !== undefined) {
        if (p.end === undefined && p.while === undefined)
          throw new MissingFieldError(p, "end or while");
      }
      if (p.end !== undefined && p.begin === undefined)
        throw new MissingFieldError(p, "begin");
      if (p.while !== undefined && p.begin === undefined)
        throw new MissingFieldError(p, "begin");
      if (p.contentName !== undefined || p.beginCaptures !== undefined) {
        if (p.begin === undefined) throw new MissingFieldError(p, "begin");
        if (p.end === undefined && p.while === undefined)
          throw new MissingFieldError(p, "end or while");
      }
      if (p.whileCaptures !== undefined) {
        if (p.begin === undefined) throw new MissingFieldError(p, "begin");
        if (p.while === undefined) throw new MissingFieldError(p, "while");
      }
      if (p.endCaptures !== undefined) {
        if (p.begin === undefined) throw new MissingFieldError(p, "begin");
        if (p.end === undefined) throw new MissingFieldError(p, "end");
      }
      if (p.applyEndPatternLast !== undefined && p.end === undefined)
        throw new MissingFieldError(p, "end");

      // validate pattern include
      if (p.include !== undefined) {
        // validate repository
        if (
          p.include.startsWith("#") &&
          !Object.keys(res.repository ?? {}).includes(p.include.slice(1))
        )
          throw new NoSuchRepositoryError(p, p.include.slice(1));

        // validate self ref
        if (p.include.startsWith("$") && p.include !== "$self")
          throw new InvalidSelfReferenceError(p, p.include);

        // invalid include
        if (
          !p.include.startsWith("#") &&
          !p.include.startsWith("$") &&
          !p.include.match(/^(text|source)(\.[\w0-9-]+)+$/)
        )
          throw new InvalidIncludeError(p, p.include);
      }
    });

    return res;
  }
}
