module.exports = {
  pluginOptions: {
    moment: {
      locales: [
        'de',
      ],
    },
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './logo.ico',
        },
        mac: {
          icon: './logo.png',
        },
        // options placed here will be merged with default configuration and passed to electron-builder
        publish: [{
          provider: 'github',
          owner: '4myhealth',
          repo: 'chelp',
        }],
      },
    },
  },
};
