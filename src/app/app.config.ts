const AppConfig: any = {
  i18n: {
    defaultLanguage: {
      code: 'en',
      title: 'English'
    },
    availableLanguages: [
      {
        code: 'en',
        title: 'English'
      },
      {
        code: 'fr',
        title: 'French'
      },
      {
        code: 'es',
        title: 'Spanish'
      },
      {
        code: 'bg',
        title: 'Bulgarian'
      },
      {
        code: 'ru',
        title: 'Russian'
      }
    ]
  },
  logging: {
    DEBUG: {
      LEVEL_1: false,
      LEVEL_2: false,
      LEVEL_3: false,
      LEVEL_4: true
    }
  }
};

export { AppConfig };
