// @ts-check
import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import boundaries from 'eslint-plugin-boundaries';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

/** CLAUDE.md §1: no design value in code. Colors and CSS units belong to the tokens. */
const NO_RAW_DESIGN_VALUES = [
  {
    selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b|\\b(rgba?|hsla?|oklch|oklab|lab|lch)\\(/]',
    message: 'Color value in code: use a design token.',
  },
  {
    selector: 'Literal[value=/\\d(px|rem|em|ch|vw|vh|dvh|svh|lvh|cqi|deg|turn|rad|ms|pt)\\b/]',
    message: 'CSS unit in code: use a design token.',
  },
  {
    selector: "JSXAttribute[name.name='style'] Property > Identifier.key",
    message: 'Inline styles may only set CSS custom properties (--name).',
  },
  {
    selector: "JSXAttribute[name.name='style'] Property > Literal.key[value!=/^--/]",
    message: 'Inline styles may only set CSS custom properties (--name).',
  },
  { selector: 'TSEnumDeclaration', message: 'No enum: use a union or an `as const` object.' },
  {
    selector: 'MemberExpression[property.name=/^(useEffect|useLayoutEffect|useMemo|useCallback)$/]',
    message: 'No effect or manual memo hooks (React Compiler, route loaders).',
  },
];

/** CLAUDE.md §4 and §7: slices through their index.ts; no effect or manual memo hooks. */
const RESTRICTED_IMPORTS = {
  paths: [
    { name: 'react', importNames: ['useEffect', 'useLayoutEffect'], message: 'No useEffect for derived state or fetching: derive in render, load in a route loader.' },
    { name: 'react', importNames: ['useMemo', 'useCallback'], message: 'React Compiler memoizes: no manual useMemo / useCallback without a measurement.' },
  ],
  patterns: [
    { regex: '(^|/)(pages|widgets|features|entities)/[^/]+/(?!index(\\.server)?\\.ts$).+', message: 'Import a slice through its index.ts.' },
    { regex: '(^|/)shared/(ui|lib|api|config)/[^/]+/(?!index(\\.server)?\\.ts$)[^/]+$', message: 'Import a shared module through its index.ts.' },
    { regex: '(^|/)shared/content/(?!index\\.ts$)(?!.*\\?raw$).+', message: 'Import site content through shared/content/index.ts.' },
    { regex: '^@portfolio/contracts/(?!constants$).+', message: 'Import contracts from the package root or /constants.' },
  ],
};

/** CLAUDE.md §2: one responsibility per file. */
const SIZE_LIMITS = {
  'max-lines': ['error', { max: 25, skipBlankLines: true, skipComments: true }],
  'max-lines-per-function': ['error', { max: 20, skipBlankLines: true, skipComments: true }],
  complexity: ['error', 6],
  'max-depth': ['error', 2],
  'max-params': ['error', 3],
};

/** CLAUDE.md §4: Feature-Sliced Design, imports only towards lower layers. */
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const allow = (from, to) => ({
  from: { element: { type: from } },
  allow: { to: { element: { types: { anyOf: to } } } },
});

export default defineConfig(
  { ignores: ['**/node_modules/**', '**/dist/**', 'apps/web/build/**', '**/.react-router/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    rules: {
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      // Module augmentation (CSSProperties extends a Record of custom properties) needs an empty interface.
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
      // Loaders throw React Router data() responses (404) by design.
      '@typescript-eslint/only-throw-error': ['error', { allow: [{ from: 'package', package: 'react-router', name: 'DataWithResponseInit' }] }],
      '@typescript-eslint/no-magic-numbers': [
        'error',
        { ignore: [0, 1, -1], ignoreArrayIndexes: true, ignoreDefaultValues: true, ignoreNumericLiteralTypes: true, ignoreTypeIndexes: true },
      ],
      'no-restricted-syntax': ['error', ...NO_RAW_DESIGN_VALUES],
      'no-restricted-imports': ['error', RESTRICTED_IMPORTS],
      ...SIZE_LIMITS,
    },
  },
  {
    files: ['apps/web/src/**/*.tsx'],
    extends: [
      eslintReact.configs['recommended-type-checked'],
      eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'],
      reactHooks.configs.flat['recommended-latest'],
      jsxA11y.configs.strict,
    ],
    rules: { '@eslint-react/dom-no-dangerously-set-innerhtml': 'error' },
  },
  {
    files: ['apps/web/src/**/*.{ts,tsx}'],
    plugins: { boundaries, 'import-x': importX },
    settings: {
      'import-x/resolver-next': [createNodeResolver({ extensions: ['.ts', '.tsx'] })],
      'boundaries/elements': [
        { type: 'app', pattern: 'apps/web/src/app' },
        { type: 'pages', pattern: 'apps/web/src/pages/*' },
        { type: 'widgets', pattern: 'apps/web/src/widgets/*' },
        { type: 'features', pattern: 'apps/web/src/features/*' },
        { type: 'entities', pattern: 'apps/web/src/entities/*' },
        { type: 'shared', pattern: 'apps/web/src/shared' },
      ],
    },
    rules: {
      'import-x/no-cycle': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: LAYERS.map((layer, index) => allow(layer, layer === 'shared' || layer === 'app' ? LAYERS.slice(index) : LAYERS.slice(index + 1))),
        },
      ],
    },
  },
  {
    // Data, schemas, tests, configuration and build tooling (ADR 0005): no size or magic-number limits.
    files: [
      'apps/web/src/shared/content/**',
      'packages/contracts/src/project.ts',
      'packages/contracts/src/constants.ts',
      '**/*.test.{ts,tsx}',
      '**/*.config.{ts,mjs}',
      'apps/web/env.schema.ts',
      'apps/web/scripts/**',
      'packages/tokens/build/**',
      'packages/tokens/test/**',
    ],
    rules: { 'max-lines': 'off', 'max-lines-per-function': 'off', '@typescript-eslint/no-magic-numbers': 'off' },
  },
  { files: ['**/*.mjs'], extends: [tseslint.configs.disableTypeChecked], languageOptions: { globals: globals.node } },
);
