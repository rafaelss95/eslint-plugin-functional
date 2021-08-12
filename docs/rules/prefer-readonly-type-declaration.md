# Prefer readonly types over mutable types (prefer-readonly-type-declaration)

This rule enforces use of readonly type declarations.

## Rule Details

This rule checks that declared types are deeply readonly (unless declared to not be).

It can also be used to enforce a naming convention for readonly vs mutable type aliases and interfaces.

Examples of **incorrect** code for this rule:

```ts
/* eslint functional/prefer-readonly-type-declaration: "error" */

type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 23, y: 44 };
point.x = 99;
```

Examples of **correct** code for this rule:

```ts
/* eslint functional/prefer-readonly-type-declaration: "error" */

type Point = {
  readonly x: number;
  readonly y: number;
};
const point1: Point = { x: 23, y: 44 };
const transformedPoint1 = { ...point, x: 99 };

type MutablePoint = {
  x: number;
  y: number;
};
const point2: MutablePoint = { x: 23, y: 44 };
point2.x = 99;
```

## Options

This rule accepts an options object of the following type:

```ts
{
  allowLocalMutation: boolean;
  allowMutableReturnType: boolean;
  ignoreClass: boolean | "fieldsOnly";
  ignoreInterface: boolean;
  ignoreCollections: boolean;
  ignorePattern?: string | Array<string>;
  aliases: {
    mustBeReadonly: {
      pattern: ReadonlyArray<string> | string;
      requireOthersToBeMutable: boolean;
    };
    mustBeMutable: {
      pattern: ReadonlyArray<string> | string;
      requireOthersToBeReadonly: boolean;
    };
    blacklist: ReadonlyArray<string> | string;
  };
}
```

The default options:

```ts
{
  allowLocalMutation: false,
  allowMutableReturnType: true,
  ignoreClass: false,
  ignoreInterface: false,
  ignoreCollections: false,
  aliases: {
    blacklist: "^Mutable$",
    mustBeReadonly: {
      pattern: "^(I?)Readonly",
      requireOthersToBeMutable: false,
    },
    mustBeMutable: {
      pattern: "^(I?)Mutable",
      requireOthersToBeReadonly: true,
    },
  },
}
```

### `allowMutableReturnType`

If set, return types of functions will not be checked.

### `ignoreClass`

If set, classes will not be checked.

Examples of **incorrect** code for the `{ "ignoreClass": false }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreClass": false }] */

class {
  myprop: string;
}
```

Examples of **correct** code for the `{ "ignoreClass": true }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreClass": true }] */

class {
  myprop: string;
}
```

### `ignoreInterface`

If set, interfaces will not be checked.

Examples of **incorrect** code for the `{ "ignoreInterface": false }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreInterface": false }] */

interface {
  myprop: string;
}
```

Examples of **correct** code for the `{ "ignoreInterface": true }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreInterface": true }] */

interface {
  myprop: string;
}
```

### `ignoreCollections`

If set, collections (Array, Tuple, Set, and Map) will not be required to be readonly when used outside of type aliases and interfaces.

Examples of **incorrect** code for the `{ "ignoreCollections": false }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreCollections": false }] */

const foo: number[] = [];
const bar: [string, string] = ["foo", "bar"];
const baz: Set<string, string> = new Set();
const qux: Map<string, string> = new Map();
```

Examples of **correct** code for the `{ "ignoreCollections": true }` option:

```ts
/* eslint functional/readonly: ["error", { "ignoreCollections": true }] */

const foo: number[] = [];
const bar: [string, string] = ["foo", "bar"];
const baz: Set<string, string> = new Set();
const qux: Map<string, string> = new Map();
```

### `aliases`

These options apply only to type aliases and interface declarations.

#### `aliases.mustBeReadonly`

##### `aliases.mustBeReadonly.pattern`

The regex pattern(s) used to test against the type's name. If it's a match the type must be deeply readonly.

Set to an empty array to disable this check.

##### `aliases.mustBeReadonly.requireOthersToBeMutable`

If set, all other types that don't match the pattern(s) must **not** be deeply readonly.

#### `aliases.mustBeMutable`

##### `aliases.mustBeMutable.pattern`

The regex pattern(s) used to test against the type's name. If it's a match the type must **not** be deeply readonly.

Set to an empty array to disable this check.

##### `aliases.mustBeMutable.requireOthersToBeReadonly`

If set, all other types that don't match the pattern(s) must be deeply readonly.

#### `aliases.blacklist`

Any type names that match this regex pattern(s) will be ignored by this rule.

#### `aliases` Examples

By toggling the default settings of `aliases.mustBeReadonly.requireOthersToBeMutable` and `aliases.mustBeMutable.requireOthersToBeReadonly`, you can make it so that types are mutable by default and immutable versions need to be prefixed. This more closely matches how TypeScript itself implements types like `Set` and `ReadonlySet`.

```ts
/* eslint functional/prefer-readonly-type-declaration: ["error", { "aliases": { "mustBeReadonly": { "requireOthersToBeMutable": true }, "mustBeMutable": { "requireOthersToBeReadonly": false } } }] */

type Point = {
  x: number;
  y: number;
};
type ReadonlyPoint = Readonly<Point>;
```

Alternatively, if both `aliases.mustBeReadonly.requireOthersToBeMutable` and `aliases.mustBeMutable.requireOthersToBeReadonly` are set, you can make it so that types explicitly need to be marked as either readonly or mutable.

```ts
/* eslint functional/prefer-readonly-type-declaration: ["error", { "aliases": { "mustBeReadonly": { "requireOthersToBeMutable": true }, "mustBeMutable": { "requireOthersToBeReadonly": true } } }] */

type MutablePoint = {
  x: number;
  y: number;
};
type ReadonlyPoint = Readonly<MutablePoint>;
```

### `allowLocalMutation`

See the [allowLocalMutation](./options/allow-local-mutation.md) docs.

### `ignorePattern`

See the [ignorePattern](./options/ignore-pattern.md) docs.
