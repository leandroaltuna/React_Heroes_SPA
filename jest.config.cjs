module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    // setupFiles: ['./jest.setup.js']
    //? Configuracion para solucionar problema de testing loop en terminal.
    "watchPathIgnorePatterns": [
        "<rootDir>/node_modules",
      ],
    //? Configuracion para solucionar problema con el query-string v9 al momento de hacer tests. Otra opcion seria usar la v7.
    transformIgnorePatterns: ['node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)',]
}


// module.exports = {

//     testEnvironment: "jest-environment-jsdom",
  
//     setupFiles: ["./jest.setup.js"],
  
//     moduleNameMapper: {
  
//       "^animate.css$": "<rootDir>/mocks/animate.css.js",
  
//     },
  
//     transformIgnorePatterns: ["/node_modules/(?!query-string)/"],
  
//   };