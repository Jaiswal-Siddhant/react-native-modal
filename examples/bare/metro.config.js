const path = require('path');
const { makeMetroConfig } = require('@rnx-kit/metro-config');

const moduleRoot = path.resolve(__dirname, '../..'); // your forked package root

module.exports = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },

  resolver: {
    // Required so Metro follows symlinks created by `yarn link` / `npm link`
    unstable_enableSymlinks: true,
    // Preserve symlinks for correct module resolution
    unstable_enableSymlinksInResolve: true,

    extraNodeModules: {
      // Map your package name to its *source* (not dist)
      'react-native-modal': path.resolve(moduleRoot),
    },
  },

  watchFolders: [
    // Watch the forked package root
    moduleRoot,
    // Also watch its node_modules if it has local deps
    path.resolve(moduleRoot, 'node_modules'),
  ],
});
