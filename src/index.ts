import type { Grammar, Pattern, TmLanguage } from "./tmLanguage";

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

  build(): TmLanguage {
    // TODO: validate patterns
    return {
      $schema:
        "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
      scopeName: this.scopeName,
      patterns: this.patterns,
      repository: Object.keys(this.repository).length
        ? this.repository
        : undefined,
    };
  }
}
