import html from "@web/rollup-plugin-html";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import image from "@rollup/plugin-image";

export default {
  input: "src/index.html",
  output: { dir: "dist", format: "cjs" },
  plugins: [
    html(),
    resolve({
      browser: true,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    image(),
  ],
};
