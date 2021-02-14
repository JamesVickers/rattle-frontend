const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      },
    resolver: {
      assetExts: [...assetExts.filter(ext => ext !== "svg"), 'db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'glb'],
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();