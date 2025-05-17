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
        // Opsi untuk ts-jest
        // Nonaktifkan diagnostik type-checking untuk percepatan
        // Anda bisa mengaktifkannya jika ingin pemeriksaan tipe saat testing
        diagnostics: false,
        tsconfig: "tsconfig.json", // Pastikan path ke tsconfig.json benar
      },
    ],
    "^.+\\.jsx?$": "babel-jest", // Untuk file .js atau .jsx jika ada
  },

  // Module Name Mapper untuk menangani impor file statis dan path alias
  moduleNameMapper: {
    // Mock file CSS (dan variasinya seperti SCSS, SASS, LESS)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mock file gambar atau aset lainnya
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    // Contoh jika Anda menggunakan path alias di vite.config.ts seperti '@/*': './src/*'
    // Sesuaikan dengan konfigurasi alias Anda
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // File yang akan dijalankan setelah environment tes disiapkan
  // Berguna untuk mengimpor jest-dom atau setup global lainnya
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Buat file ini jika belum ada

  // Ekstensi file yang akan dicari Jest
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Direktori root tempat Jest akan mencari file tes
  roots: ["<rootDir>/src"],

  // Pola nama file tes
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",

  // Kumpulkan informasi cakupan kode
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  // Opsi untuk mengabaikan path tertentu dari cakupan
  // coveragePathIgnorePatterns: [
  //   "/node_modules/",
  //   "/src/main.tsx", // Contoh
  // ],
};

export default config;
