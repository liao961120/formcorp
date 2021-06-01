<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid>
        <v-row align="center" class="mx-7 pa-0 full-width">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </v-row>
      </v-container>
    </v-main>

    <!-- Scroll to Top/Bottom -->
    <v-speed-dial v-model="nav" fixed bottom right style="z-index: 1000">
      <template v-slot:activator>
        <v-btn v-model="nav" color="blue-grey" dark fab x-small>
          <v-icon v-if="nav">mdi-close</v-icon>
          <v-icon v-else>mdi-unfold-more-horizontal</v-icon>
        </v-btn>
      </template>
      <v-btn
        color="light-blue darken-4"
        dark
        small
        fab
        onclick="window.scrollTo(0, document.body.scrollHeight);"
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn
        color="light-blue darken-4"
        dark
        small
        fab
        onclick="document.documentElement.scrollTop = 0;"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-speed-dial>

    <LeftDrawer></LeftDrawer>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "@/components/footer.vue";
import LeftDrawer from "@/components/leftDrawer.vue";

export default {
  components: {
    LeftDrawer,
    Footer,
  },
  props: {
    source: String,
  },
  data: () => ({
    nav: false,
  }),
};
</script>

<style>
html {
  overflow-y: scroll;
  scroll-behavior: smooth !important;
}
textarea {
  font-family: "Monaco", "Courier New", Courier, monospace !important;
}
/* Highlight matched gloss */
span.matchedtoken {
  background: rgba(255, 255, 0, 0.582);
}
span.fuzzy {
  background: rgba(255, 187, 0, 0.507);
}
.gloss__line--free span.matchedtoken {
  background: rgba(136, 255, 0, 0.561);
}
</style>