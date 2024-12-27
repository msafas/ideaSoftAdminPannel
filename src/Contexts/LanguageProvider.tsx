
import AsyncStorage from '@react-native-async-storage/async-storage';

import { I18n } from 'i18n-js';
import { createContext, useState, useEffect, useContext } from 'react'
import ENTranslation from '../Language/en.json'
import TRTranslation from '../Language/tr.json'

// Set the key-value pairs for the different languages you want to support.
const translations = {
    en: formatTranslations(ENTranslation),
    tr: formatTranslations(TRTranslation),


};

function formatTranslationKey(k: string){
    return k.replace(/[\.\[\]\(\)]/g, "_");
}

function formatTranslations(translation) {
    var newTranslation = {};
    for (var k in translation) {
        if (typeof translation[k] == 'string') {
            newTranslation[formatTranslationKey(k)] = translation[k];
        } else {
            newTranslation[formatTranslationKey(k)] = formatTranslations(translation[k]);
        }
    }
    return newTranslation;
}

const Languages = [
    {
        name: '🇬🇧 English',
        code: 'en'
    },
    {
        name: '🇹🇷 Türkçe',
        code: 'tr'
    },
   


]

export type LanguageKeys = keyof typeof TRTranslation;

export const TranslationContext = createContext(null)

export const useLanguage = () => useContext(TranslationContext) as {
    translate: (key: LanguageKeys) => string,
    lang: string,
    setLang: (lang: string) => void,
    languages: typeof Languages,
    i18n: I18n
}

export const LanguageProvider = ({ children }: any) => {

    const [index, setIndex] = useState(0);
    //const [lang, setLang] = useState(Localization.locale.split('-')[0]);
    // todo: enable language support
    const [lang, setLang] = useState("tr");
    const [i18n, setI18n] = useState(() => {
        return new I18n(translations);
    });

   

    useEffect(() => {

        // Set the locale once at the beginning of your app.
        i18n.locale = lang;

        // When a value is missing from a language it'll fallback to another language with the key present.
        i18n.enableFallback = true;
        // To see the fallback mechanism uncomment line below to force app to use Japanese language.
        // i18n.locale = 'ja';


        AsyncStorage.getItem('lang').then(lang => {
            if (lang) {
                // todo : enable language support
                setLang(lang)
                // i18n.locale = lang;

            }
        }
        ).catch(err => {
            // console.log(err)
        });

    }, []);

    console.log('lang', lang)

    const setLanguage = (lang: string) => {
        // console.log(lang);
        i18n.locale = lang;
        AsyncStorage.setItem('lang', lang).catch(console.error);
        setLang(lang);
    }
    return (<TranslationContext.Provider value={{
        translate: (k) => {
            return i18n.t(formatTranslationKey(k))
        },
        i18n,
        lang,
        setLang: setLanguage,
        languages: Languages
    }}>{children}</TranslationContext.Provider>)
}