<template>
  <!-- Left drawer -->
  <v-navigation-drawer width="268" v-model="drawer" app>
    <v-list dense>
      <v-list-item two-line class="mb-2">
        <v-list-item-avatar>
          <img src="https://img.yongfu.name/affiliations/GIL.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Gloss Search</v-list-item-title>
          <v-list-item-subtitle class="text-overline"
            >南島語料搜尋</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item link router to="/">
        <v-list-item-action>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link router to="/long-text?id=amis/test/test.json">
        <v-list-item-action>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Long Text</v-list-item-title>
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
    <v-footer fixed color="blue-grey lighten-5" height="37.5">
      <v-row class="mt-n4">
        <v-col cols="4">
          <v-btn
            icon
            color="light-green darken-2"
            href="https://github.com/liao961120/gloss-search/"
            target="_blank"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn
            icon
            color="deep-orange lighten-2"
            href="mailto:liao961120@gmail.com"
            target="_blank"
          >
            <v-icon>mdi-email-outline</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn icon href="https://yongfu.name" target="_blank" color="pink">
            <v-avatar size="22">
              <img
                src="https://img.yongfu.name/icon/me-blackwhite.svg"
                alt="Yongfu"
              />
            </v-avatar>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
}
</script>