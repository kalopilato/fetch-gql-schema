module.exports = {
  moduleFileExtensions: ['js'],
  modulePaths: ['src', 'utils'],
  rootDir: '.',
  setupFilesAfterEnv: [
    '<rootDir>/testSetup/globalMocks.js'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
}
