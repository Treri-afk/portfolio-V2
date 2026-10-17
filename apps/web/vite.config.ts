import babel from '@rolldown/plugin-babel';
import { reactRouter } from '@react-router/dev/vite';
import { Features } from 'lightningcss';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import { envSchema } from './env.schema.ts';

// React Compiler runs before React Router's own transforms.
const reactCompiler = { ...(await babel({ plugins: ['babel-plugin-react-compiler'] })), enforce: 'pre' as const };

export default defineConfig(({ command, mode }) => {
  envSchema(command === 'serve').parse(loadEnv(mode, process.cwd(), 'VITE_'));
  return config;
});

const config = {
  css: {
    transformer: 'lightningcss',
    // light-dark() stays native (Baseline 2024): the polyfill cannot follow a dynamic color-scheme (inverse slices).
    lightningcss: { drafts: { customMedia: true }, exclude: Features.LightDark },
  },
  build: {
    cssMinify: 'lightningcss',
    // The whole site's CSS is ~10 kB gzipped: one stylesheet beats ten render-blocking requests.
    cssCodeSplit: false,
  },
  plugins: [reactCompiler, reactRouter()],
} satisfies UserConfig;
