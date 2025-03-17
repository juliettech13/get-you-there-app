import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import createJestConfig from 'next/jest';

const config = createJestConfig({
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

export default config(customJestConfig);
