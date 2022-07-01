/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['.'],
  moduleNameMapper: {
    '^types/(.*)': '<rootDir>\\types\\$1',
  },
}
