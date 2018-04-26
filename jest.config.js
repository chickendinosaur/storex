'use strict';

module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    projects: ['./src'],
    testEnvironment: 'node',
    testRegex: '.\\.test\\.(js?|jsx?|ts?|tsx?)$',
    transform: {
        '\\.js$|\\.jsx$|\\.ts$|\\.tsx$': 'ts-jest'
    }
};
