<template>
    <v-dialog v-model="dialog" width="100%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          :color="`${btnColor} lighten-1`"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <b>{{ title }}</b>
        </v-btn>
      </template>

      <v-card>
        <v-card-title fixed top class="headline grey lighten-2">
          <b>{{ title }}</b>
        </v-card-title>

        <div class="d-flex flex-wrap pa-4">
          <template v-for="(text, i) in meta">
              <v-card ripple v-on:click="toLongText(language, text.file)" :key="i" class="ma-2" style="width: 31%">

                <v-card-text>
                  <v-list dense>
                    <v-list-item v-for="(v, k) in text" :key="k + '0' + i">
                      <v-list-item-icon class="text-caption">
                        <v-icon v-text="metaMap[k].icon"></v-icon>
                        <span
                          class="pl-2"
                          style="
                            display: inline-block;
                            min-width: 5.7em;
                            font-weight: bold;
                          "
                          >{{ metaMap[k].name }}</span
                        >
                        <span
                          v-if="k == 'record_time'"
                          >{{ formatTime(v) }}</span
                        >
                        <span v-else>{{ v }}</span>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
          </template>
        </div>
      </v-card>

      <v-btn fab small fixed bottom right color="primary mr-8 mb-6" @click="dialog = false"><b>關閉</b></v-btn>
    </v-dialog>
</template>


<script>
export default {
  props: ["meta", "language", "title", "btnColor"],
  methods: {
    formatTime: function (seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.round(seconds % 60);
      return [
        h == 0 ? "" : `${h} 小時`,
        `${m > 9 ? m : h ? "0" + m : m || "0"} 分`,
        `${s > 9 ? s : "0" + s} 秒`,
      ].join(" ");
    },
    toLongText: function(lang, file) {
      this.$router.push({ name: 'LongText', params: { id: `${lang}/${file}`}, hash: '#'})
    }
  },
  data() {
    return {
      dialog: false,
      metaMap: {
        file: { name: "檔案", icon: "mdi-paperclip" },
        topic: { name: "主題", icon: "mdi-book-open-page-variant" },
        type: { name: "體例", icon: "mdi-newspaper-variant-outline" },
        speaker: { name: "發音人", icon: "mdi-account" },
        collected: { name: "採集日期", icon: "mdi-calendar-month" },
        iu_num: { name: "IU數", icon: "mdi-information-outline" },
        sent_num: { name: "句數", icon: "mdi-lead-pencil" },
        record_time: { name: "長度", icon: "mdi-av-timer" },
      },
    };
  },
};
</script>

<style scoped>
</style>