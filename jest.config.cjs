/** @type {import('jest').Config} */
const config = {
  // Preset untuk TypeScript
  preset: "ts-jest",

  // Lingkungan tes yang akan digunakan Jest
  testEnvironment: "jest-environment-jsdom",

  // Transformasi file
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: "tsconfig.json",
      },
    ],
    "^.+\\.jsx?$": "babel-jest",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",

    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "cjs"],

  roots: ["<rootDir>/src"],

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/main.tsx", // Contoh
  ],
  transformIgnorePatterns: ["/node_modules/(?!@tanstack)/"],
};

module.exports = config;
