import enTranslations from '../locales/en.json';
import roTranslations from '../locales/ro.json';

export type Locale = 'en' | 'ro';

export const locales: Locale[] = ['en', 'ro'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ro: 'Română'
};

const translations = {
  en: enTranslations,
  ro: roTranslations
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations.en;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return the key if not found anywhere
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
