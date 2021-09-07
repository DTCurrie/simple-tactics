import rollupResolve from "@rollup/plugin-node-resolve";
import rollupReplace from "@rollup/plugin-replace";
import rollupImage from "@rollup/plugin-image";

import { hmrPlugin } from "@web/dev-server-hmr";
import { fromRollup } from "@web/dev-server-rollup";

const resolve = fromRollup(rollupResolve);
const replace = fromRollup(rollupReplace);
const image = fromRollup(rollupImage);

export default {
  watch: true,
  nodeResolve: true,
  rootDir: "src/",
  appIndex: "src/index.html",
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
    image({ exclude: ["src/images/**/*"] }),
    hmrPlugin({
      include: ["/src/game/**/*"],
    }),
  ],
};
