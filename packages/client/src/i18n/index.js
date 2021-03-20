import enUS from '../locales/en-US/locale.json';
import zhCN from '../locales/zh-CN/locale.json';

const nativeNames = new Map(
  Object.entries({
    'en-US': 'en-US',
    'zh-CN': '简体中文',
  })
);

function getDefaultLocaleCode() {
  return 'en-US';
}

function getLocaleCodeByLangCode(langCode) {
  switch (langCode.toLowerCase()) {
    case 'en':
    case 'en-au':
    case 'en-bz':
    case 'en-ca':
    case 'en-cb':
    case 'en-gb':
    case 'en-ie':
    case 'en-in':
    case 'en-jm':
    case 'en-nz':
    case 'en-ph':
    case 'en-tt':
    case 'en-us':
    case 'en-za':
    case 'en-zw':
      return 'en-US';
    case 'zh':
    case 'zh-cn':
    case 'zh-sg':
    case 'zh-hans-cn':
    case 'cmn-hans-cn':
    case 'cmn-hans-sg':
    case 'zh-tw':
    case 'zh-hant-tw':
    case 'cmn-hant-tw':
    case 'zh-hk':
    case 'zh-mo':
    case 'zh-hant-hk':
    case 'zh-hant-mo':
    case 'yue-hant-hk':
    case 'yue-hant-mo': {
      return 'zh-CN';
    }
    default:
      return getDefaultLocaleCode();
  }
}

function getPreferLocaleCode() {
  let localeCode = null;
  if (typeof navigator !== 'undefined') {
    for (let i = 0; i < navigator.languages.length; i += 1) {
      localeCode = getLocaleCodeByLangCode(navigator.languages[i]);
      if (localeCode) {
        break;
      }
    }
  }
  return localeCode;
}

function i18n() {}

i18n.setCurrentLocaleCode = (localeCode) => {
  window.currentLocaleCode = localeCode;
};

i18n.init = () => {
  const localeCode = getPreferLocaleCode();
  i18n.setCurrentLocaleCode(localeCode);
};

i18n.getCurrentLocaleCode = () => window.currentLocaleCode;

i18n.getCurrentLocale = () => {
  switch (i18n.getCurrentLocaleCode()) {
    case 'en-US':
      return enUS;
    case 'zh-CN':
      return zhCN;
    default:
      throw new Error("i18n isn't inited");
  }
};

function t(origKey) {
  if (!i18n.getCurrentLocaleCode()) {
    i18n.init();
  }
  const keys = origKey.split(':');
  let object = i18n.getCurrentLocale();
  keys.forEach((key) => {
    if (object) {
      object = object[key];
    }
  });
  if (typeof object === 'string') {
    return object;
  }
  return `Can't find "${origKey}" in "${i18n.getCurrentLocaleCode()}" resource`;
}

i18n.getNativeNames = () => nativeNames;

i18n.getNativeNameByLocale = (localeName) => nativeNames.get(localeName);

i18n.getLocaleByNativeName = (nativeName) => {
  let localeName = null;
  nativeNames.forEach((value, key) => {
    if (value === nativeName) {
      localeName = key;
    }
  });
  return localeName;
};

i18n.isDefaultLocale = (localeCode) => {
  if (localeCode === getDefaultLocaleCode()) {
    return true;
  }
  return false;
};

export { i18n, t };
