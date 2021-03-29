<template>
  <!-- Left drawer -->
  <v-navigation-drawer width="268" v-model="drawer" app>
    <v-list dense>
      <v-list-item two-line class="mb-2 ml-0 pl-2">
        <a href="/">
          <v-list-item-avatar>
            <img
              class="logo"
              src="https://img.yongfu.name/affiliations/GIL.png"
            />
          </v-list-item-avatar>
        </a>

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

      <v-list-item link router to="/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>語料搜尋</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/language" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-microphone-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>收錄語言</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>最新消息</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item  link router to="/about" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>關於我們</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-subheader class="pb-0 mb-0">External Links</v-subheader>

      <v-list-item href="https://yongfu.name/docs-gloss-search" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-text-box-multiple</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>User Guide</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Footer -->
    <v-footer fixed color="" height="37.5">
      <v-row class="mt-n4">
        <v-col cols="4">
          <v-btn
            icon
            color="light-green darken-2"
            href=""
            target="_blank"
          >
            <v-icon></v-icon>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn
            icon
            color="deep-orange lighten-2"
            href=""
            target="_blank"
          >
            <v-icon></v-icon>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn icon href="" target="" color="">
            <!-- <v-avatar size="22">
              <img
                src=""
                alt=""
              />
            </v-avatar> -->
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      // drawer2: this.drawer,
    };
  },
};
</script>

<style scoped>
</style>