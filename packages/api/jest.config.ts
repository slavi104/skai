import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(spec|test).ts'],
  moduleNameMapper: {
    '^@prisma/client$': '<rootDir>/src/test-utils/prisma-client.mock.ts',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/app.module.ts',
    '!src/prisma/**',
    '!src/**/dto/**',
    '!src/**/*.controller.ts',
    '!src/**/*.module.ts',
    '!src/**/*.guard.ts',
    '!src/common/filters/**',
    '!src/common/tenant.decorator.ts',
    '!src/test-utils/**',
    '!src/types/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;


