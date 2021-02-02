<template>
  <div>
    <div class="text">
      <template v-for="(res, i) in text.glosses">
        <Leipzig
          v-bind:gloss="res[1]"
          v-bind:lastSentEndNum="lastSentEndNum"
          :key="i"
          :id="res[1].num"
          :class="[{ tohash: hash == `#${res[1].num}` }]"
        />
      </template>
    </div>

    <!-- Top Menu bar -->
    <v-app-bar flat color="transparent" app min-width="330">
      <!-- <v-app-bar-nav-icon color="orange red--text accent-1" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-btn @click.stop="drawer = !drawer" icon depressed style="background:#FFD180">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-row justify="center" align="center">
        <v-spacer class="d-none d-md-flex"></v-spacer>
        <v-col cols="6" class="d-none d-sm-flex grey--text text-darken-3 text-h6">
          {{ text.meta.video.replace('.mp3', '') }}
          <DocMeta v-bind:meta="text.meta"></DocMeta>
        </v-col>
        <v-spacer class="d-none d-md-flex"></v-spacer>

        <!-- <v-col class="d-none d-sm-flex mr-3" sm="2" lg="1"> </v-col> -->

        <!-- <v-col class="ml-0 mr-7 pr-5" cols="1"> -->
        <!-- </v-col> -->
      </v-row>
    </v-app-bar>

    <!-- Left drawer -->
    <LeftDrawer v-bind:drawer="drawer"></LeftDrawer>
  </div>
</template>

<script>
import Leipzig from "@/components/LeipzigLongText.vue";
import LeftDrawer from "@/components/leftDrawer.vue";
import DocMeta from "@/components/docMeta.vue";

export default {
  components: {
    Leipzig,
    LeftDrawer,
    DocMeta,
  },
  created: function () {
    this.getAudio();
  },
  props: ["drawer"],
  data() {
    return {
      text: {},
      src: `https://yongfu.name/glossParser/json-long-text/${this.$route.params.id}.mp3.json`,
      currGroupNum: false,
      lastSentEndNum: [],
      hash: this.$route.hash,
    };
  },
  methods: {
    getAudio: function () {
      this.$http.get(this.src).then(function (data) {
        this.text = data.body;
        this.lastSentEndNum = this.text.glosses
          .map((x) => [x[1].num, x[1].s_end])
          .filter((x) => x[1])
          .map((x) => x[0]);
        this.lastSentEndNum.unshift(0);
      });
    },
  },
};
</script>

<style scoped>
.meta {
  /* position: fixed;
  display: block;
  width: 10%;
  margin-right: 0;
  right: 0;
  top: 2%; */
  z-index: 100;
}
.text {
  width: 100%;
  text-align: left;
  font-size: 1.05em;
}
</style>