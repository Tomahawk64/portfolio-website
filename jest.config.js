/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.{js,ts}'],
  collectCoverageFrom: ['src/lib/**/*.{ts,js}'],
};

module.exports = config;
