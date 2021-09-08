import rollupResolve from "@rollup/plugin-node-resolve";
import rollupReplace from "@rollup/plugin-replace";

import rollupPostcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import simpleVars from "postcss-simple-vars";
import cssnano from "cssnano";

import { hmrPlugin } from "@web/dev-server-hmr";
import { esbuildPlugin } from "@web/dev-server-esbuild";

import { fromRollup } from "@web/dev-server-rollup";

const resolve = fromRollup(rollupResolve);
const replace = fromRollup(rollupReplace);
const postcss = fromRollup(rollupPostcss);

export default {
  watch: true,
  nodeResolve: true,
  rootDir: "src/",
  appIndex: "src/index.html",
  mimeTypes: {
    "**/*.scss": "js",
  },
  plugins: [
    resolve({
      browser: true,
    }),
    replace({
      include: ["src/**/*.js"],
      __environment__: '"development"',
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    postcss({
      include: ["src/**/*.scss"],
      extensions: ["scss"],
      plugins: [
        autoprefixer(),
        postcssPresetEnv(),
        simpleVars(),
        cssnano({ preset: "default" }),
      ],
    }),
    esbuildPlugin({ js: true, target: "auto" }),
    hmrPlugin({
      include: ["src/game/**/*"],
    }),
  ],
};
