<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="100%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-small
          color="red lighten-2 mr-10"
          dark
          v-bind="attrs"
          v-on="on"
        >
          故事
        </v-btn>
      </template>

      <v-card>
        <v-card-title fixed top class="headline grey lighten-2">
          故事
        </v-card-title>

        <div class="d-flex flex-wrap pa-4">
          <template v-for="(text, i) in storyMeta">
              <v-card ripple :key="i" class="ma-2" style="width: 32%">
                <router-link :key="i + '0'" :to="{ name: 'LongText', params: { id: `${langauge}/${text.file}`}, hash: '#'}">x
                  </router-link>
                <!-- <v-card-title class="headline grey lighten-2"> 故事 </v-card-title> -->

                <v-card-text>
                  <v-list dense>
                    <v-list-item v-for="(v, k) in text" :key="k + '0' + i">
                      <v-list-item-icon>
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
                          style="font-size: 0.9em"
                          >{{ formatTime(v) }}</span
                        >
                        <span v-else style="font-size: 0.9em">{{ v }}</span>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>

          </template>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false"> 關閉 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: ["storyMeta", "langauge"],
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