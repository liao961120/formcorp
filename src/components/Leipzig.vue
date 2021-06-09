<template>
  <div>
    <span class="gloss-src src-num">{{ gloss.num }}</span>
    <template v-if="'video' in gloss.meta">
      <button
        class="iu-audio"
        title="IU發音"
        v-if="(gloss.iu_a_span[0] != null) & (gloss.iu_a_span[1] != null)"
        v-on:click="
          playAudio(
            get_audio_url_by_split_time(
              gloss.iu_a_span[0],
              gloss.iu_a_span[1],
              gloss.meta.video
            )
          )
        "
      >
        <v-icon small color="blue lighten-1">mdi-volume-high</v-icon>
      </button>
    </template>

    <v-tooltip bottom color="rgba(255, 115, 133, 0.85)">
      <template v-slot:activator="{ on, attrs }">
        <span class="gloss-src src-doc" v-bind="attrs" v-on="on">
          <router-link
            :to="{
              name: 'LongText',
              params: { id: gloss.file },
              hash: '#' + gloss.num,
            }"
          >
            <v-icon dense color="pink lighten-3">mdi-link-box-variant-outline</v-icon>
          </router-link>
        </span>
      </template>

      <template v-for="(value, name) in gloss.meta">
        <span
          v-if="(value != '') & (value != 'None')"
          class="meta"
          :key="value + name"
        >
          <span style="display: inline-block; min-width: 5.5em"
            >{{ name }}:</span
          >
          <strong style="display: inline-block">{{ value }}</strong>
          <br />
        </span>
      </template>
    </v-tooltip>

    <div class="example gloss--glossed">
      <p
        v-if="gloss.ori.length > 0"
        class="gloss__line--original gloss__line gloss__line--0"
      >
        <span v-html="ori_highlighted"></span>
      </p>

      <!-- Glossed Lines -->
      <div class="gloss__words">
        <div
          class="gloss__word"
          v-for="(tup, idx) in gloss_hightlighted"
          :key="idx + Math.random()"
        >
          <p class="gloss__line gloss__line--1">
            <span v-html="tup[0]"></span>
          </p>
          <p class="gloss__line gloss__line--2">
            <span v-html="tup[1]"></span>
          </p>
          <p class="gloss__line gloss__line--3">
            <span v-html="tup[2]"></span>
          </p>
        </div>
      </div>

      <!-- Free Lines -->
      <p
        v-for="(line, i) in free_highlighted"
        :key="i + Math.random()"
        :class="`gloss__line--free gloss__line gloss__line--${i + 4}`"
      >
        <span v-html="line"></span>
      </p>
    </div>
  </div>
</template>

<script>
import { Highlight } from "@/helpers.js";

export default {
  props: ["gloss", "query", "showplaintext", "ignoreCharSet", "proxyCharSet"],
  data() {
    return {
      audio_url: "https://yongfu.name/FormCorp-audio", // no slash at end
      plain_text_gloss: "",
      /* See https://yongfu.name/gloss-search/2020_Budai_Rukai/data.json for data format*/
      curr_audio: new Audio(),
    };
  },
  computed: {
    ori_highlighted() {
      var query_str = this.query.query;

      if (this.query.type == "gloss")
        return this.gloss.ori
          .map((tk) =>
            Highlight.highlight(
              tk,
              query_str,
              this.query.regex,
              this.ignoreCharSet,
              this.proxyCharSet
            )
          )
          .join(" ");
      else if (this.query.type == "ori")
        return Highlight.highlight(
          this.gloss.ori.join(" "),
          query_str,
          this.query.regex,
          this.ignoreCharSet,
          this.proxyCharSet
        );
      else return this.gloss.ori.join(" ");
    },

    gloss_hightlighted() {
      var query_str = this.query.query;

      if (this.query.type == "gloss")
        return this.gloss.gloss.map((tup) => [
          Highlight.highlight(
            tup[0],
            query_str,
            this.query.regex,
            this.ignoreCharSet,
            this.proxyCharSet
          ),
          Highlight.highlight(
            tup[1],
            query_str,
            this.query.regex,
            this.ignoreCharSet,
            this.proxyCharSet
          ),
          Highlight.highlight(
            tup[2],
            query_str,
            this.query.regex,
            this.ignoreCharSet,
            this.proxyCharSet
          ),
        ]);
      else return this.gloss.gloss;
    },

    free_highlighted() {
      // Check search type
      if (this.query.type == "free")
        return this.gloss.free.map((sent) =>
          Highlight.highlight(
            sent,
            this.query.query,
            this.query.regex,
            this.ignoreCharSet,
            this.proxyCharSet
          )
        );
      else return this.gloss.free;
    },
  },
  methods: {
    playAudio(url) {
      this.curr_audio.pause();
      this.curr_audio = new Audio(url);
      this.curr_audio.volume = 1.0;
      this.curr_audio.play();
    },
    get_audio_url_by_split_time(start_time, end_time, ori_audio) {
      const start =
        start_time % 1 == 0 ? start_time + ".0" : start_time.toString();
      const end = end_time % 1 == 0 ? end_time + ".0" : end_time.toString();
      return `${this.audio_url}/${ori_audio.replace(
        ".mp3",
        ""
      )}_${start}-${end}.mp3`;
    },
  },
};
</script>



<style scoped>
span.gloss-src {
  font-size: 0.75em;
}
span.src-num::after {
  content: ".";
}
span.src-doc {
  color: white;
  padding: 2px 5px;
  float: right;
  font-family: "Monaco", "Consolas", "Courier New", Courier, monospace;
  font-size: 0.63em;
}
span.gloss-src a {
  text-decoration: none;
}
button.iu-audio {
  display: inline-block;
  padding-left: 0.2em;
}

.gloss--glossed:after {
  clear: left;
  content: "";
  display: block;
}

ul.gloss--glossed,
ol.gloss--glossed {
  padding-left: 0;
}

ul.gloss--glossed li,
ol.gloss--glossed li {
  list-style-type: none;
}

.gloss__abbr {
  font-variant: small-caps;
  font-variant-numeric: oldstyle-nums;
  text-transform: lowercase;
}

.gloss__word {
  float: left;
  margin-bottom: 1em;
  margin-right: 1em;
}

.gloss__word p {
  margin: 0;
}

.gloss--no-space .gloss__word {
  margin-right: 0;
}

.gloss--no-space .gloss__word.gloss__word--spacer {
  margin-right: 1.5em;
}

.gloss__words:first-child,
.gloss--glossed li:first-child {
  margin-top: 1em;
}

.gloss--glossed li:last-child {
  margin-bottom: 1em;
}

.gloss__word .gloss__line:first-child {
  font-style: italic;
}

.gloss__line--original {
  font-weight: bold;
  font-style: italic;
  word-spacing: 0.3em;
  font-family: "Times New Roman", Times, serif;
  margin-bottom: 0.6em;
}

.gloss__line--free,
.gloss__line--no-align {
  clear: left;
  margin: 0 0;
  font-family: "Times New Roman", Times, serif;
  font-size: 0.78em;
}

.gloss__line--hidden {
  display: none;
}

.gloss__line--1 {
  font-family: "Times New Roman", Times, serif;
}
.gloss__line--2 {
  font-family: "Times New Roman", Times, serif;
  font-size: 0.85em;
}
.gloss__line--3 {
  font-family: "Times New Roman", Times, serif;
  font-size: 0.85em;
}

.plain-text-gloss {
  display: block;
  width: 80%;
}
audio::-webkit-media-controls-panel,
video::-webkit-media-controls-panel {
  background-color: rgba(204, 204, 204, 0.781);
  width: 35%;
}
</style>