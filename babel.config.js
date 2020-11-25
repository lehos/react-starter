const { NODE_ENV, REACT_FAST_REFRESH } = process.env;

module.exports = function exports(api) {
  api.cache(true);

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-namespace-from',
    [
      '@emotion',
      { sourceMap: NODE_ENV === 'development', cssPropOptimization: true }
    ]
  ];

  if (REACT_FAST_REFRESH === 'true') {
    plugins.push('react-refresh/babel');
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: [
              'last 2 Chrome versions',
              'last 2 Firefox versions',
              'last 2 Safari versions',
              'last 2 Edge versions'
            ]
          },
          debug: NODE_ENV === 'production'
        }
      ],
      ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
      [
        '@babel/preset-react',
        // { runtime: 'automatic', importSource: '@emotion/core' }
      ]
    ],
    plugins
  };
};
