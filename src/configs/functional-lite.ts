import deepMerge from "deepmerge";
import type { Linter } from "eslint";

import functional from "./functional";

const config: Linter.Config = deepMerge(functional, {
  rules: {
    "functional/immutable-data": ["error", { ignoreClass: "fieldsOnly" }],
    "functional/no-conditional-statement": "off",
    "functional/no-expression-statement": "off",
    "functional/no-try-statement": "off",
    "functional/functional-parameters": [
      "error",
      {
        enforceParameterCount: false,
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "functional/prefer-readonly-type-declaration": "warn",
      },
    },
  ],
});

export default config;
