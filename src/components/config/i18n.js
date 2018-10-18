import I18n from 'ex-react-native-i18n'
import th from './languages/th'
import en from './languages/en'
import ch from './languages/ch'

I18n.fallbacks = true

I18n.translations = {
    en,
    th,
    ch
}

export default I18n