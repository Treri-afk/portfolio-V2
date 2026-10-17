import StyleDictionary from 'style-dictionary';
import { cssFormat, customMediaFormat, faviconFormat, mediaFormat } from './formats.mjs';

StyleDictionary.registerTransform({
  name: 'name/path',
  type: 'name',
  transform: (token) => token.path.join('-'),
});
StyleDictionary.registerFormat({ name: 'css/portfolio', format: cssFormat });
StyleDictionary.registerFormat({ name: 'css/custom-media', format: customMediaFormat });
StyleDictionary.registerFormat({ name: 'ts/media', format: mediaFormat });
StyleDictionary.registerFormat({ name: 'svg/favicon', format: faviconFormat });

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  log: { verbosity: 'default' },
  platforms: {
    css: {
      transforms: ['name/path'],
      buildPath: 'dist/',
      files: [
        { destination: 'tokens.css', format: 'css/portfolio' },
        { destination: 'custom-media.css', format: 'css/custom-media' },
        { destination: 'media.ts', format: 'ts/media' },
        { destination: 'favicon.svg', format: 'svg/favicon' },
      ],
    },
  },
});

await sd.buildAllPlatforms();
