import html from "@web/rollup-plugin-html";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

import polyfillsLoader from "@web/rollup-plugin-polyfills-loader";

export default {
  input: "src/index.html",
  output: { dir: "dist", format: "cjs" },
  plugins: [
    html(),
    resolve({
      browser: true,
    }),
    replace({
      include: ["src/**/*.js"],
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    postcss({
      include: ["src/**/*.scss"],
      plugins: [
        autoprefixer(),
        postcssPresetEnv(),
        cssnano({ preset: "default" }),
      ],
    }),
    polyfillsLoader({
      polyfills: {
        coreJs: true,
        regeneratorRuntime: true,
      },
    }),
  ],
};
