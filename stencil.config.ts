import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.scss',
  plugins: [
    sass(),
    {
      transform(source, id) {
        return {
          code: source
            .replace(`var wrap = require('optimism').wrap;`, '')
            .replace('export { wrap }', 'export { wrap } from "optimism";'),
          id
        };
      }
    }
  ],
  nodeResolve: {
    browser: true,
  }
};
