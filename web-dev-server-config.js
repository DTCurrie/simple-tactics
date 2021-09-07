import rollupResolve from "@rollup/plugin-node-resolve";
import rollupReplace from "@rollup/plugin-replace";
import rollupPostcss from "rollup-plugin-postcss";
import rollupImage from "@rollup/plugin-image";

import { hmrPlugin } from "@web/dev-server-hmr";
import { fromRollup } from "@web/dev-server-rollup";

const resolve = fromRollup(rollupResolve);
const replace = fromRollup(rollupReplace);
const image = fromRollup(rollupImage);
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
      include: ["/src/**/*.js"],
      __environment__: '"development"',
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    image(),
    postcss({
      include: ["src/**/*.scss"],
    }),
    hmrPlugin({
      include: ["/src/game/**/*"],
    }),
  ],
};
