import { Features } from 'lightningcss';
import { defineConfig } from 'vitest/config';

// Without the React Router plugin: tests target modules and components, not the router build.
export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: { drafts: { customMedia: true }, exclude: Features.LightDark },
  },
  test: {
    name: 'web',
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
