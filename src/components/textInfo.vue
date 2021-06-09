<template>
  <v-dialog v-model="dialog" width="100%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        :color="`${btnColor} lighten-1`"
        :dark="meta.length > 0"
        :disabled="meta.length == 0"
        v-bind="attrs"
        v-on="on"
      >
        <b>{{ title }}</b>
      </v-btn>
    </template>

    <v-card height="100%">
      <v-card-title fixed top class="headline grey lighten-2">
        <b>{{ title }}</b>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn x-small fab flat color="deep-orange" @click="dialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card-title>

      <v-simple-table dense fixed-header height="29em" class="pa-3">
        <template v-slot:default>
          <thead>
            <tr>
              <template v-for="k in filterMetaKeys(meta[0])">
                <th class="text-left" :key="k">
                  <v-icon v-text="metaMap[k].icon"></v-icon>
                  {{ $t(metaMap[k].name) }}
                  
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(text, i) in metaSorted" :key="i + '0'" class="text-caption">
              <template v-for="k in filterMetaKeys(text)">
                <td v-if="k == 'record_time'" :key="k + '0' + i">
                  {{ formatTime(text.record_time) }}
                </td>
                <td v-else-if="k == 'collected'" :key="k + '0' + i">
                  <template v-if="isValidDate(text.collected)">{{ text.collected }}</template>
                  <template v-else>?</template>
                </td>
                <td v-else :key="k + '0' + i">
                  <template v-if="k == 'file'">
                    <router-link v-if="texttype == 'Story'" :to="{name: 'LongText', 
                    params: { id: `story/${text.file}` }, 
                    hash: '#'}"
                    class="router-link">
                      {{ text[k] }}
                    </router-link>
                    <router-link v-else :to="{name: 'LongText', 
                    params: { id: `sentence/${text.file}` }, 
                    hash: '#'}"
                    class="router-link">
                      {{ text[k] }}
                    </router-link>
                  </template>
                  <template v-else>{{ text[k] }}</template>
                </td>
              </template>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  props: ["meta", "language", "title", "btnColor", "texttype"],
  methods: {
    formatTime: function (seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.round(seconds % 60);
      if (this.$i18n.locale == 'tw')
        return [
          h == 0 ? "" : `${h} 小時`,
          `${m > 9 ? m : h ? "0" + m : m || "0"} 分`,
          `${s > 9 ? s : "0" + s} 秒`,
        ].join(" ");
      else
        return [
          h == 0 ? "" : `${h} hr`,
          `${m > 9 ? m : h ? "0" + m : m || "0"} min`,
          `${s > 9 ? s : "0" + s} sec`,
        ].join(" ");
    },
    isValidDate: function (d_str) {
      if (typeof d_str !== 'string') return false
      if (d_str.split('-').length != 3) return false
      if (!d_str.split('-')[0].startsWith('2') & !d_str.split('-')[0].startsWith('1')) return false
      return true
    },
    toLongText: function (lang, file) {
      this.$router.push({
        name: "LongText",
        params: { id: `${lang}/${file}` },
        hash: "#",
      });
    },
    filterMetaKeys: function(obj) {
      // Sort table columns by predefined order in metaKeys
      var arr2 = Object.keys(obj);
      return this.metaKeys.filter(function(n) {
        return arr2.indexOf(n) !== -1;
      });
    }
  },
  computed: {
    metaSorted: function() {
      var meta = [ ...this.meta ];
      return meta.sort((a, b) => a.file.localeCompare(b.file));
    }
  },
  data() {
    return {
      dialog: false,
      metaKeys: ["type", "file", "collected", "topic", "iu_num", "sent_num", "record_time", "speaker"],
      metaMap: {
        file: { name: "檔案", icon: "mdi-paperclip" },
        topic: { name: "主題", icon: "mdi-book-open-page-variant" },
        type: { name: "體例", icon: "mdi-newspaper-variant-outline" },
        speaker: { name: "發音人", icon: "mdi-account" },
        collected: { name: "採集日期", icon: "mdi-calendar-month" },
        iu_num: { name: "IU數", icon: "mdi-information-outline" },
        sent_num: { name: "句數", icon: "mdi-lead-pencil" },
        record_time: { name: "長度", icon: "mdi-av-timer" },
        transcribed: {name: "轉寫者", icon: "mdi-file"}
      },
    };
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: #F4511E;
}
.router-link:hover {
  text-decoration: underline;
}
</style>