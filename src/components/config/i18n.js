import I18n from 'react-native-i18n'
import th from './languages/th'
import en from './languages/en'

I18n.fallbacks = true

I18n.translations = {
    en,
    th
}

export default I18n