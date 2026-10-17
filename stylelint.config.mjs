/**
 * CLAUDE.md §1: no design value outside the tokens. Every property that carries a design value must
 * read a custom property (var(--…)); only neutral values are allowed, and raw colors, color functions,
 * units and raw media queries are rejected everywhere except in the generated token output.
 */
const NEUTRAL_VALUES = ['0', '1', '100%', 'auto', 'none', 'inherit', 'initial', 'unset', 'currentColor', 'currentcolor', 'transparent', '1fr', 'tabular-nums'];

const DESIGN_PROPERTIES = [
  '/color$/',
  'background',
  'fill',
  'stroke',
  'stroke-width',
  '/^font/',
  'line-height',
  'letter-spacing',
  '/^margin/',
  '/^padding/',
  '/gap$/',
  '/^inset/',
  '/-size$/',
  '/^(min-|max-)?(width|height)$/',
  'top',
  'right',
  'bottom',
  'left',
  '/^border(-[a-z]+)*-width$/',
  'outline-width',
  'filter',
  '/delay$/',
  'aspect-ratio',
  'border-radius',
  'box-shadow',
  'opacity',
  'z-index',
  '/duration$/',
  '/timing-function$/',
  'outline-offset',
  'text-underline-offset',
  'text-decoration-thickness',
  'rotate',
  'scale',
  'translate',
];

/** CLAUDE.md §6: slants only through Slice, SlantRule and the page transition (ADR 0005). Scales only from tokens (0 and 1 stay neutral). */
const SLANT_RULES = {
  'clip-path': ['/polygon/'],
  transform: ['/skew/', '/rotate/', '/scale(X|Y|3d)?\\([^)]*(\\d*\\.\\d|[2-9]|\\d\\d)/'],
  rotate: ['/.+/'],
  scale: ['/^[0-9.]+$/'],
};
const SLANT_OWNERS = ['apps/web/src/shared/ui/Slice/*.css', 'apps/web/src/shared/ui/SlantRule/*.css', 'apps/web/src/app/styles/view-transitions.css'];

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-declaration-strict-value'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', 'apps/web/build/**'],
  rules: {
    'import-notation': 'string',
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla', 'oklch', 'oklab', 'lab', 'lch', 'color'],
    'unit-disallowed-list': ['px', 'rem', 'em', 'ch', 'vw', 'vh', 'dvh', 'svh', 'lvh', 'cqi', 'deg', 'turn', 'rad', 'ms', 's', 'pt'],
    // Breakpoints come from the generated @custom-media (--bp-*), never a raw width or height.
    'media-feature-name-disallowed-list': ['/width/', '/height/'],
    'scale-unlimited/declaration-strict-value': [DESIGN_PROPERTIES, { ignoreValues: NEUTRAL_VALUES, disableFix: true }],
    'declaration-property-value-disallowed-list': SLANT_RULES,
    // Private custom properties of a component start with an underscore (--_bg).
    'custom-property-pattern': '^_?[a-z][a-z0-9]*(-[a-z0-9]+)*$',
  },
  overrides: [{ files: SLANT_OWNERS, rules: { 'declaration-property-value-disallowed-list': null } }],
};
