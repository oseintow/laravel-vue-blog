module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/resources/assets/js/$1',
        '^test/(.*)$': '<rootDir>/resources/assets/js/test/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    testMatch: [
        '**/resources/js/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/'
}
