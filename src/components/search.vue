<template>
  <div v-scroll="handleScroll" class="container">
    <div class="results" :key="search_results_key">
      <template v-for="(res, i) in vue_seach_results_lazy">
        <Leipzig
          v-bind:gloss="res"
          v-bind:query="query"
          v-bind:showplaintext="false"
          v-bind:ignoreCharSet="ignoreCharSet"
          v-bind:proxyCharSet="proxyCharSet"
          :key="i"
        />
      </template>
    </div>
    <v-btn
      v-if="infscroll > 60"
      @click="infscroll += 15"
      :disabled="vue_seach_results.length <= infscroll"
      x-small
      >Show More</v-btn
    >

    <!-- Top Menu bar -->
    <v-app-bar app color="orange accent-1" min-width="330">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-row justify="center" align="center">
        <v-col>
          <v-text-field
            spellcheck="false"
            :placeholder="$t('搜尋字串')"
            :value="query_lazy"
            @change="(v) => (query_lazy = v)"
            outlined
            dense
            class="mt-6"
          />
        </v-col>

        <!-- <v-spacer class="d-none d-md-flex mr-5"></v-spacer> -->

        <v-col cols="2" class="d-none d-md-flex">
          <v-select
            :items="
              this.$i18n.locale == 'tw'
                ? docfilterSelect1.tw
                : docfilterSelect1.en
            "
            v-model="docfilter1"
            dense
            class="mt-6 px-0"
            outlined
            :label="$t('語言')"
          ></v-select>
        </v-col>

        <v-col cols="2" class="d-none d-md-flex">
          <v-select
            :items="
              this.$i18n.locale == 'tw'
                ? docfilterSelect2.tw
                : docfilterSelect2.en
            "
            v-model="docfilter2"
            dense
            class="mt-6 px-0"
            outlined
            :label="$t('語料來源')"
          ></v-select>
        </v-col>

        <v-col cols="2" class="d-none d-md-flex">
          <v-select
            :items="this.$i18n.locale == 'tw' ? querytypes.tw : querytypes.en"
            v-model="query.type"
            dense
            class="mt-6 px-0"
            outlined
            :label="$t('搜尋範圍')"
          ></v-select>
        </v-col>

        <v-col class="d-none d-md-flex mr-3" sm="2" lg="1">
          <v-switch
            v-model="query.regex"
            value="1"
            :true-value="1"
            :false-value="0"
            :label="query.regex == '1' ? $t('表達式') : $t('標準')"
            inset
            dense
            class="mt-4"
            color="info"
          ></v-switch>
        </v-col>

        <v-col class="mx-1 px-0" cols="2">
          <v-btn small fab style="z-index: 5">
            <v-badge
              offset-x="8"
              offset-y="8"
              v-if="vue_seach_results.length > 0"
              color="green"
              :content="vue_seach_results.length"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-badge>
            <v-icon v-else>mdi-magnify</v-icon>
          </v-btn>

          <v-btn
            class="ml-4 mr-0 px-0 d-none d-md-inline-block"
            small
            fab
            dark
            color="cyan lighten-1"
            outlined
            @click="copyShareURL"
            title="Copy share URL"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <input v-model="shareURL" ref="text" type="hidden" />
    <!-- Bottom Menu bar for mobile -->
    <v-bottom-navigation
      app
      grow
      height="54"
      color="blue-grey lighten-4"
      class="d-flex d-md-none"
    >
      <span class="mx-1" style="width: 30%">
        <v-select
          :items="
              this.$i18n.locale == 'tw'
                ? docfilterSelect1.tw
                : docfilterSelect1.en
            "
          v-model="docfilter1"
          dense
          outlined
          :label="$t('語言')"
          class="mt-2 mx-0"
        ></v-select>
      </span>

      <span class="ml-0 mr-3" style="width: 30%">
        <v-select
          :items="
            this.$i18n.locale == 'tw'
              ? docfilterSelect2.tw
              : docfilterSelect2.en
          "
          v-model="docfilter2"
          dense
          class="mt-2 mx-0"
          outlined
          :label="$t('語料來源')"
        ></v-select>
      </span>

      <span class="mx-0" style="width: 29%">
        <v-switch
          v-model="query.regex"
          value="1"
          :true-value="1"
          :false-value="0"
          :label="query.regex == '1' ? $t('表達式') : $t('標準')"
          inset
          dense
          color="success"
          class="mt-3"
        ></v-switch>
      </span>
      <v-btn
        style="width: 15%"
        class="mx-0 pr-0"
        @click="copyShareURL"
        title="Copy share URL"
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <span></span>
    </v-bottom-navigation>
  </div>
</template>

<script>
import Leipzig from "@/components/Leipzig.vue";
// @ is an alias to /src

export default {
  name: "gloss-search",
  components: {
    Leipzig,
  },
  data() {
    return {
      search_results_key: 0,
      database: "https://yongfu.name/glossParser/all_lang.json",
      results: [],
      querytypes: {
        tw: [
          {
            text: "語料",
            value: "gloss",
          },
          {
            text: "註釋",
            value: "free",
          },
        ],
        en: [
          {
            text: "Gloss Lines",
            value: "gloss",
          },
          {
            text: "Free Lines",
            value: "free",
          },
        ],
      },
      query: {
        query: this.$route.query.query ? this.$route.query.query : "",
        regex: this.$route.query.regex ? this.$route.query.regex : 0,
        type: this.$route.query.type ? this.$route.query.type : "gloss",
      },
      docfilter1: this.$route.query.filter1
        ? this.$route.query.filter1
        : "Amis_Ciwkangan",
      docfilterSelect1: {
        tw: [
          { text: "阿美 (長光)", value: "Amis_Ciwkangan" },
          { text: "噶瑪蘭 (新社)", value: "Kavalan_Xinshe" },
          { text: "撒奇萊雅", value: "Sakizaya_Sakizaya" },
          { text: "魯凱 (霧台)", value: "Rukai_Vedai" },
          { text: "賽夏 (東河)", value: "Saisiyat_Tong-he" },
          { text: "泰雅 (汶水)", value: "Atayal_Mayrinax" },
          { text: "賽德克 (Tgdaya)", value: "Seediq_Tgdaya" },
          { text: "布農 (Isbukun)", value: "Bunun_Isbukun" },
          { text: "鄒語", value: "Tsou" },
          { text: "卡那卡那富", value: "Kanakanavu_Kanakanavu" },
          { text: "全部", value: "" },
        ],
        en: [
          { text: "Amis (Ciwkangan)", value: "Amis_Ciwkangan" },
          { text: "Kavalan (Xinshe)", value: "Kavalan_Xinshe" },
          { text: "Sakizaya", value: "Sakizaya_Sakizaya" },
          { text: "Rukai (Vedai)", value: "Rukai_Vedai" },
          { text: "Saisiyat (Tong he)", value: "Saisiyat_Tong-he" },
          { text: "Atayal (Mayrinax)", value: "Atayal_Mayrinax" },
          { text: "Seediq (Tgdaya)", value: "Seediq_Tgdaya" },
          { text: "Bunun (Isbukun)", value: "Bunun_Isbukun" },
          { text: "Tsou", value: "Tsou" },
          { text: "Kanakanavu", value: "Kanakanavu_Kanakanavu" },
          { text: "All", value: "" },
        ],
      },
      docfilter2: this.$route.query.filter2
        ? this.$route.query.filter2
        : "",
      docfilterSelect2: {
        tw: [
          { text: "故事", value: "story" },
          { text: "句子", value: "sentence" },
          { text: "語法書", value: "grammar" },
          { text: "全部", value: "" },
        ],
        en: [
          { text: "Story", value: "story" },
          { text: "Sentence", value: "sentence" },
          { text: "GrammarBook", value: "grammar" },
          { text: "All", value: "" },
        ],
      },
      infscroll: 15,
      ignoreCharSet: ",_/^’\\-='<>.:()".split(""),
      proxyCharSet: [ 
        ["ʉ", "u"],
        ["á", "a"],
        ["é", "e"],
        ["í", "i"],
        ["ó", "o"],
        ["ú", "u"]
      ],
    };
  },
  computed: {
    query_lazy: {
      get() {
        return this.query.query;
      },
      set(v) {
        this.query.query = v;
      },
    },
    docfilter: function() {
      const filt = `${this.docfilter2}/${this.docfilter1}`;
      if (filt == "/") return ""
      return filt
    },
    filtered_results: function () {
      if (this.docfilter == "") return this.results;
      var doc_pat = RegExp(`${this.docfilter}`);

      if (this.results.length > 0)
        return this.results.filter((gloss) => {
          return doc_pat.test(gloss.file);
        });
      else return this.results;
    },

    vue_seach_results: function () {
      if (this.query.query.trim() == "") return []; //this.results; //
      // Check regex validity
      if (this.query.regex == 1) {
        try {
          new RegExp(this.query.query.trim());
        } catch (e) {
          return [];
        }
      }

      const results = this.filtered_results;
      var search_pats = this.query.query.trim().split(/\s*&&\s*/);
      if (this.query.regex == 1) {
        search_pats = search_pats.map((x) => RegExp(x));
      }

      var search_results = [];
      for (var i = 0; i < results.length; i++) {
        // Gloss line contents
        var gloss_content = [
          ...new Set(results[i].gloss.flat().concat(results[i].ori.flat())),
        ];

        if (this.query.type == "gloss") {
          var matchNum = 0;
          for (let j = 0; j < search_pats.length; j++) {
            // Exact search
            if (this.query.regex == 0) {
              var norm_pat = this.normToken(search_pats[j]);
              let isMatch = gloss_content.some(
                //tk => tk == search_pats[j]
                (tk) =>
                  tk.includes(search_pats[j]) |
                  (this.normToken(tk).includes(norm_pat) &
                    (norm_pat.length > 1))
              );
              if (isMatch) matchNum++;
              // Regex search
            } else {
              let isMatch = gloss_content.some((tk) => search_pats[j].test(tk));
              if (isMatch) matchNum++;
            }
          }
          if (matchNum == search_pats.length) search_results.push(results[i]);

          // Search Notes
        } else {
          // Free line contents
          var free_content = results[i].free.join(" "); // a string

          // Exact search
          if (this.query.regex == 0) {
            if (search_pats.every((pat) => free_content.includes(pat)))
              search_results.push(results[i]);
            // Regex search
          } else {
            if (search_pats.every((pat) => pat.test(free_content)))
              search_results.push(results[i]);
          }
        }
      }

      return search_results;
    },

    vue_seach_results_lazy: function () {
      return this.vue_seach_results.slice(0, this.infscroll);
    },
    is_empty_vue_search_results: function() {
      return this.vue_seach_results.length == 0;
    },
    shareURL: function () {
      var baseURL = window.location.href.replace(/#\/.*$/, "");
      var p = {
        q: encodeURIComponent(this.query.query),
        r: encodeURIComponent(this.query.regex),
        t: encodeURIComponent(this.query.type),
        f1: encodeURIComponent(this.docfilter1),
        f2: encodeURIComponent(this.docfilter2),
      };
      document.execCommand("copy");
      return `${baseURL}#${this.$route.path}?query=${p.q}&regex=${p.r}&type=${p.t}&filter1=${p.f1}&filter2=${p.f2}`;
    },
  },
  created: function () {
    this.$http.get(this.database).then(function (data) {
      this.results = data.body;
    });
  },
  watch: {
    "query.query": function () {
      this.forceReload();
      this.infscroll = 15;
      document.documentElement.scrollTop = 0;
      this.reportEmptyMatch(); 
    },
  },
  methods: {
    normToken: function (x) {
      for (let i = 0; i < this.ignoreCharSet.length; i++)
        x = x.replaceAll(this.ignoreCharSet[i], "");
      for (let i = 0; i < this.proxyCharSet.length; i++)
        x = x.replaceAll(this.proxyCharSet[i][0], this.proxyCharSet[i][1]);
      return x.toLowerCase();
    },
    handleScroll: function () {
      if (this.vue_seach_results_lazy.length < this.vue_seach_results.length) {
        if (
          window.innerHeight + window.scrollY + 100 >=
          document.body.offsetHeight
        )
          this.infscroll += 30;
      }
    },
    forceReload: function () {
      this.search_results_key += 1;
    },
    copyShareURL: function () {
      this.$refs.text.type = "text";
      this.$refs.text.select();
      document.execCommand("copy");
      this.$refs.text.type = "hidden";
      alert(
        "已複製分享網址至剪貼簿\n使用此網址分享你的搜尋結果\nCopied share URL!\nUse this URL to share your current search results"
      );
    },
    reportEmptyMatch: function() {
      if (this.query.query.trim() != "" && this.is_empty_vue_search_results) {
        alert("搜尋無果\nNo results found!");
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
}
.results {
  /* margin-top: 175px; */
  width: 100%;
  text-align: left;
  font-size: 1.1em;
  counter-reset: resultseq;
}

.results > div {
  padding: 0.5em;
  border-radius: 10px;
  margin-bottom: 1em;
  counter-increment: resultseq;
}

.results > div:nth-child(2n + 1) {
  background: rgba(153, 153, 153, 0.212);
  border: solid 2px white;
}
.results > div:nth-child(2n + 1):hover {
  background: rgba(223, 223, 223, 0.3);
  border: solid 2px rgba(197, 197, 197, 0.63);
}
.results > div:nth-child(2n) {
  border: solid 2px rgba(211, 211, 211, 0.452);
}
.results > div:nth-child(2n):hover {
  background: rgba(230, 230, 230, 0.171);
  border: solid 2px rgba(197, 197, 197, 0.63);
}
/* Auto rownumber for search results */
.results > div::before {
  display: inline-block;
  content: counter(resultseq)")";
  width: 3.5em;
  margin-left: -3.5em;
  padding-right: 1.3em;
  font-size: .7em;
  color: rgb(104, 104, 104);
  text-align: right;
}
</style>
