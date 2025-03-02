import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,

  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  moduleDirectories: [
    "node_modules"
  ],

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],

  rootDir: '../../',
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],

  testMatch: [
    '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],

  testEnvironment: "jsdom",

  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.scss$': '<rootDir>/config/jest/mock.ts',
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/config/jest/mock.ts",
    '@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  reporters: [
      'default',
      ['jest-html-reporters', {
        publicPath: '<rootDir>/reports/unit',
        filename: 'report.html',
        openReporter: true,
        inlineSource: true,
      }],
  ],

  globals: {
    __IS_DEV__: true,
    __API__: '',
  },
};

export default config;
