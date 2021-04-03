<template>
  <v-navigation-drawer width="268" app permanent expand-on-hover fixed
  mini-variant-width=66>
    <v-list dense>
      <v-list-item two-line class="px-2">
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

      <v-list-item  link router to="/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>關於我們</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/search/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>語料搜尋</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/language/" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-microphone-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>收錄語言</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="#" active-class="deep-orange--text">
        <v-list-item-action>
          <v-icon>mdi-link-variant</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>相關資源</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!-- <v-subheader class="pb-0 mb-0 text-caption">外部連結</v-subheader> -->

      <!-- <v-list-item href="https://linguistics.ntu.edu.tw/" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-warehouse</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>台大語言所</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item href="https://linguistics.ntu.edu.tw/" target="_blank" class="px-3">
        <v-list-item-action class="mr-2">
          <v-list-item-avatar>
            <img
              src="https://img.yongfu.name/affiliations/GIL.png"
            />
          </v-list-item-avatar>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>台大語言所</v-list-item-title>
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