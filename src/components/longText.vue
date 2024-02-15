<template>
  <div class="container">
    <div class="text">
      <template v-for="(res, i) in text.glosses">
        <Leipzig
          v-bind:gloss="res[1]"
          v-bind:glossNum="res[0]"
          v-bind:lastSentEndNum="lastSentEndNum"
          :key="i"
          :class="[{ tohash: hash == `#${res[0]}` }]"
          :id="res[0]"
        />
      </template>
    </div>

    <!-- Top Menu bar -->
    <v-app-bar flat color="transparent" app min-width="330">
      <!-- <v-app-bar-nav-icon color="orange red--text accent-1" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <!-- <v-btn @click.stop="drawer = !drawer" icon depressed style="background:#FFD180">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      
      <span style="position:fixed;left:1rem;top:0.95rem" v-if="full_text_audio != ''">
        <audio controls controlsList="nodownload" style="width:280px;height:30px;">
          <source :src="full_text_audio" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </span>

      <span style="position:fixed;right:1rem;top:1rem;color:grey">
        {{ `${filename.split('/').pop()}.txt` }}
      </span>
      <v-row justify="center" align="center">
        <v-spacer class="d-none d-md-flex"></v-spacer>
        <v-col cols="5" class="d-none d-sm-flex justify-center grey--text text-darken-3 text-h6">
          <template v-if="'meta' in text">
            {{ text.meta.language.split(', ')[0] }}
          </template>
          <DocMeta v-bind:meta="text.meta"></DocMeta>
        </v-col>
        <v-spacer class="d-none d-md-flex"></v-spacer>

        <!-- <v-col class="d-none d-sm-flex mr-3" sm="2" lg="1"> </v-col> -->

        <!-- <v-col class="ml-0 mr-7 pr-5" cols="1"> -->
        <!-- </v-col> -->
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import Leipzig from "@/components/LeipzigLongText.vue";
import DocMeta from "@/components/docMeta.vue";

export default {
  components: {
    Leipzig,
    DocMeta,
  },
  created: function () {
    this.getAudio();
  },
  data() {
    return {
      text: {},
      audio_server: "//140.112.147.116:8080/",
      src: `https://yongfu.name/glossParser/${this.$route.params.id}.json`,
      filename: `${this.$route.params.id}`,
      currGroupNum: false,
      lastSentEndNum: [],
      hash: this.$route.hash,
      full_text_audio: "",
    };
  },
  methods: {
    getAudio: function () {
      this.$http.get(this.src).then(function (data) {
        this.text = data.body;
        if ("video" in this.text.meta & this.text.meta.video != 'None')
          this.full_text_audio = this.audio_server + this.text.meta.video; //this.$audioMap[];
        // ToDo: Google API to get url filename match
        this.lastSentEndNum = this.text.glosses
          .map((x) => [x[0], x[1].s_end])
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
.container {
  width: 100%;
}
.text {
  width: 100%;
  text-align: left;
  font-size: 1.05em;
}
</style>