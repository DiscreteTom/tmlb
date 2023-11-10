import type { Grammar, Pattern, TmLanguage } from "./tmLanguage.js";

export class Repository {
  private readonly repo: NonNullable<Grammar["repository"]>;

  constructor() {
    this.repo = {};
  }

  append(name: string, pattern: Pattern) {
    this.repo[name] = pattern;
    return this;
  }
}

// TODO: add comments
export class TmBuilder {
  readonly scopeName: string;
  readonly repo: Repository;
  readonly patterns: Pattern[];

  constructor(props: Pick<TmBuilder, "scopeName">) {
    this.scopeName = props.scopeName;
    this.repo = new Repository();
    this.patterns = [];
  }

  append(pattern: Pattern) {
    this.patterns.push(pattern);
    return this;
  }

  build(): TmLanguage {
    return {
      $schema:
        "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
      scopeName: this.scopeName,
      patterns: this.patterns,
    };
  }
}
