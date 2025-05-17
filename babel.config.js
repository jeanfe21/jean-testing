// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], // Target environment Node saat ini untuk Jest
    ["@babel/preset-react", { runtime: "automatic" }], // Untuk JSX transform otomatis
    "@babel/preset-typescript", // Untuk TypeScript
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
};
