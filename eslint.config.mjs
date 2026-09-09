// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // storybook-static/ is gitignored build output (npm run build-storybook)
    // but this override replaces eslint-config-next's own ignore list rather
    // than extending it, so it wasn't excluded here -- once the directory
    // exists on disk, `eslint` lints its minified bundles and reports
    // thousands of spurious errors/warnings unrelated to any real source.
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"]
]);

export default eslintConfig;
