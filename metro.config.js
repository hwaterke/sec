// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname)

const config = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig?.transformer,
    minifierConfig: {
      ...defaultConfig?.transformer?.minifierConfig,
      keep_fnames: true, // To avoid cyclic dependency "t" error of typeorm in release build
    },
  },
}

module.exports = config
