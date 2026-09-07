import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base JS quality rules
      ...js.configs.recommended.rules,

      // React Hooks — catches missing deps, conditional hook usage etc.
      ...reactHooks.configs.recommended.rules,
      // These two rules fire on valid intentional patterns (transition state machines,
      // mutable ref sync) — downgrade to warn so CI doesn't break on them.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",

      // React Refresh / Vite HMR compatibility
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // General quality
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-debugger": "error",
      "no-undef": "error",
    },
  },
];

