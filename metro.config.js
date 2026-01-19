const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Reduce file watching to prevent EMFILE errors
config.watchFolders = [__dirname];

// Remove blockList that might be blocking metro-runtime
// The default Expo config should handle module resolution correctly
config.resolver = {
    ...config.resolver,
    unstable_enablePackageExports: true,
};

module.exports = config;
