<template>
  <v-navigation-drawer width="268" app permanent expand-on-hover fixed
  mini-variant-width=66>
    <v-list dense>
      <v-list-item two-line class="px-2 no-active" link router to="/">
        <v-list-item-avatar>
          <img 
            class=""
            src="https://img.yongfu.name/affiliations/GIL.png"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >NTU Corpus of<br />
            Formosan Languages</v-list-item-title
          >
          <v-list-item-subtitle class="text-overline"
            >台大台灣南島語料庫</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list-item link router to="/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('關於我們') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item link router to="/language/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-microphone-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('收錄語言') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/search/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('語料搜尋') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-subheader class="pb-0 mb-0">{{ $t('語料說明') }}</v-subheader>

      <v-list-item link router to="/writingsystem/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-note-edit-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('書寫系統') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/coding/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-format-annotation-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('標記說明') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/stories/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-information-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('故事簡介') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/resources/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-link-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('相關資源') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-subheader class="pb-0 mb-0 text-caption">外部連結</v-subheader> -->

      <!-- <v-list-item href="https://linguistics.ntu.edu.tw/" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-warehouse</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>台大語言所</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

    <v-divider></v-divider>

    <v-list-item @click="locale_tw = !locale_tw">
        <v-list-item-action>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ locale_tw ? 'English' : '繁體中文' }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    
    <v-list-item href="https://linguistics.ntu.edu.tw/" target="_blank" class="px-3">
        <v-list-item-action class="mr-2">
          <v-list-item-avatar>
            <img
              src="https://img.yongfu.name/affiliations/GIL.png"
            />
          </v-list-item-avatar>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ $t('台大語言所') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>


    <!-- Footer -->
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      locale_tw: true,
    };
  },
  watch: {
    locale_tw(bool) {
      if (bool) {
        this.$i18n.locale = "tw";
        localStorage.setItem("locale", "tw");
      } else {
        this.$i18n.locale = "en";
        localStorage.setItem("locale", "en");
      }
    },
  },
  created: function () {
    if (this.$i18n.locale == "tw") this.locale_tw = true;
    else this.locale_tw = false;
  },
};
</script>

<style scoped>
.no-active::before {
  opacity: 0 !important;
}
</style>