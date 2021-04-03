<template>
<div>
  <v-navigation-drawer width="268" v-model="drawer" app bottom temporary>
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
            >後端管理說明</v-list-item-title
          >
          <v-list-item-subtitle class="text-overline"
            >臺大台灣南島語料庫</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <template v-for="link in sidebar">
        <v-list-item link router :to="link.route" active-class="deep-orange--text" :key="link.name">
          <v-list-item-action>
            <v-icon>{{ link.mdi }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      

      <v-divider></v-divider>
      <v-subheader class="pb-0 mb-0 text-caption">外部連結</v-subheader>

      <v-list-item href="https://formcorp.netlify.app" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-web</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>南島語料庫</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
     
      <v-list-item href="https://glosss.yongfu.name" target="_blank">
        <v-list-item-action>
          <v-icon>mdi-book-education</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Gloss Search</v-list-item-title>
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
</div>

</template>




<script>
export default {
  props: ["drawer"],
  data() {
    return {
      sidebar: [
        { title: 'Home', route: '/', mdi: 'mdi-home' },
        { title: 'About', route: '/about', mdi: 'mdi-information-outline' },
        { title: 'Update', route: '/update', mdi: 'mdi-update' },
      ]
    };
  },
};
</script>

<style scoped>
</style>