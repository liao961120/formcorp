import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import VueI18n from 'vue-i18n'
// import VueCryptojs from 'vue-cryptojs'

// Vue.use(VueCryptojs)  // Encryption
Vue.use(VueResource)  // http requests
Vue.use(VModal)
Vue.use(VueI18n)

const messages = {
  en: {
    hello: 'hello world',
    "搜尋字串": "Search",
    "語言": "Language",
    "搜尋範圍": "Target",
    "表達式": "RegEx",
    "標準": "STD",
    // Sidebar
    "關於我們": "About",
    "收錄語言": "Languages",
    "語料搜尋": "Search Corpus",
    "相關資源": "Other Resources",
    "台大語言所": "NTU GIL",
    // languages/
    "故事": "Story",
    "句子": "Sentence",
    "語法書": "Book",
    "長度": "Recorded",
    "IU數": "IUs",
    "句數": "Sentences",
    // Footer
    "樂學地址": "Lesyue Building, No. 1, Sec. 4, Roosevelt Rd., Taipei City, Taiwan (R.O.C.) 10617",
    "計畫負責人": "Li-May Sung (Project Leader)",
    "電子郵件：": "Email: ",
    "電話：": "Phone: ",
    "傳真：": "Fax: ",
    "臺灣大學語言學研究所": "Graduate Institute of Linguistics"
    
  },
  tw: {
    hello: '哈囉世界',
    "搜尋字串": "搜尋字串",
    "語言": "語言",
    "搜尋範圍": "搜尋範圍",
    "表達式": "表達式",
    "標準": "標準",
    // Sidebar
    "關於我們": "關於我們",
    "收錄語言": "收錄語言",
    "語料搜尋": "語料搜尋",
    "相關資源": "相關資源",
    "台大語言所": "臺大語言所",
    // languages/
    "故事": "故事",
    "句子": "句子",
    "語法書": "語法書",
    "長度": "長度",
    "IU數": "IU數",
    "句數": "句數",
    //Footer
    "樂學地址": "106 臺北市大安區羅斯福路四段一號 樂學館",
    "計畫負責人": "計畫負責人：宋麗梅",
    "電子郵件：": "電子郵件：",
    "電話：": "電話：",
    "傳真：": "傳真：",
    "臺灣大學語言學研究所": "臺灣大學語言學研究所",
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'tw', // set locale
  messages, // set locale messages
})


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
