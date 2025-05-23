import type { Config } from "jest";

const config: Config = {
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

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",

    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  roots: ["<rootDir>/src"],

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/main.tsx", // Contoh
  ],
};

export default config;
