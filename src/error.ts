import type { Pattern } from "./tmLanguage";

export type ValidationErrorType =
  | "INVALID_SCOPE_NAME"
  | "INVALID_CAPTURE_KEY"
  | "INVALID_DISABLED_VALUE"
  | "INVALID_APPLY_END_PATTERN_LAST_VALUE"
  | "MISSING_FIELD"
  | "NO_SUCH_REPOSITORY"
  | "INVALID_SELF_REFERENCE"
  | "INVALID_INCLUDE";

export class ValidationError extends Error {
  type: ValidationErrorType;
  constructor(type: ValidationErrorType, msg: string) {
    super(msg);
    this.type = type;
    // https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InvalidScopeNameError extends ValidationError {
  constructor(public scopeName: string) {
    super(
      "INVALID_SCOPE_NAME",
      `Invalid scope name: ${scopeName} (should match pattern /^(text|source)(\\.[\\w0-9-]+)+$/)`,
    );
    Object.setPrototypeOf(this, InvalidScopeNameError.prototype);
  }
}

export class InvalidCaptureKeyError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public key: string,
  ) {
    super(
      "INVALID_CAPTURE_KEY",
      `Invalid capture key: ${key} (should match pattern /^[0-9]+$/) in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, InvalidCaptureKeyError.prototype);
  }
}

export class InvalidDisabledValueError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public value: number,
  ) {
    super(
      "INVALID_DISABLED_VALUE",
      `Invalid disabled value: ${value} (should be 0 or 1) in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, InvalidDisabledValueError.prototype);
  }
}

export class InvalidApplyEndPatternLastValueError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public value: number,
  ) {
    super(
      "INVALID_APPLY_END_PATTERN_LAST_VALUE",
      `Invalid applyEndPatternLast value: ${value} (should be 0 or 1) in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, InvalidApplyEndPatternLastValueError.prototype);
  }
}

export class MissingFieldError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public field: string,
  ) {
    super("MISSING_FIELD", `Missing field: ${field} in pattern ${pattern}`);
    Object.setPrototypeOf(this, MissingFieldError.prototype);
  }
}

export class NoSuchRepositoryError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public name: string,
  ) {
    super(
      "NO_SUCH_REPOSITORY",
      `No such repository: ${name} in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, NoSuchRepositoryError.prototype);
  }
}

export class InvalidSelfReferenceError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public name: string,
  ) {
    super(
      "INVALID_SELF_REFERENCE",
      `Invalid self reference: ${name} (should be $self) in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, InvalidSelfReferenceError.prototype);
  }
}

export class InvalidIncludeError extends ValidationError {
  constructor(
    public pattern: Pattern,
    public name: string,
  ) {
    super(
      "INVALID_INCLUDE",
      `Invalid include: ${name} (should be #<repository> or $self or match /^(text|source)(\\.[\\w0-9-]+)+$/ ) in pattern ${pattern}`,
    );
    Object.setPrototypeOf(this, InvalidIncludeError.prototype);
  }
}
