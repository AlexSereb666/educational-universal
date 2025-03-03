import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import alexsereb666 from "eslint-plugin-alexsereb666-plugin";
import unusedImports from 'eslint-plugin-unused-imports';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'alexsereb666-plugin': alexsereb666,
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'alexsereb666-plugin/path-checker': ['error', {alias: '@'}],
      'alexsereb666-plugin/layer-imports': [
        'error',
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider', '**/routerConfig'],
        }
      ],
      'alexsereb666-plugin/public-api-imports': [
          'error',
          {
            alias: '@',
            testFiles: ['**/*.test.*', '**/*.story.*']
          }
      ],
      'no-unused-vars': 'off',
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
      "@typescript-eslint/no-namespace": "off",
    }
  }
];