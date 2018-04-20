'use strict';

module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css)$': 'typescript'
    },
    projects: ['./src'],
    setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
    transform: {
        '\\.js$|\\.jsx$|\\.ts$|\\.tsx$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: '.\\.test\\.(js?|jsx?|ts?|tsx?)$'
};
