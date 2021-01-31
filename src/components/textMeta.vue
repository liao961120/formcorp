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

    <v-card height="100%">
      <v-card-title fixed top class="headline grey lighten-2">
        <b>{{ title }}</b>
      </v-card-title>

      <v-simple-table dense fixed-header height="29em" class="pa-3">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left" v-for="(v, k) in meta[0]" :key="k">
                <v-icon v-text="metaMap[k].icon"></v-icon>
                {{ metaMap[k].name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(text, i) in metaSorted" :key="i + '0'" class="text-caption">
              <template v-for="(v, k) in text">
                <td v-if="k == 'record_time'" :key="k + '0' + i">
                  {{ formatTime(v) }}
                </td>
                <td v-else-if="k == 'collected'" :key="k + '0' + i">
                  <template v-if="isValidDate(v)">{{ v }}</template>
                  <template v-else>?</template>
                </td>
                <td v-else :key="k + '0' + i">
                  <router-link v-if="k == 'file'" :to="{name: 'LongText', params: { id: `${language}/${text.file}` }, hash: '#'}"
                  class="router-link">
                    {{ v }}
                  </router-link>
                  <template v-else>{{ v }}</template>
                </td>
              </template>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-btn
      fab
      small
      fixed
      top
      right
      color="primary mr-7 mt-6"
      @click="dialog = false"
      ><b>關閉</b></v-btn
    >
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
    isValidDate: function (d_str) {
      if (typeof d_str !== 'string') return false
      if (d_str.split('-').length != 3) return false
      if (!d_str.split('-')[0].startsWith('2')) return false
      return true
    },
    toLongText: function (lang, file) {
      this.$router.push({
        name: "LongText",
        params: { id: `${lang}/${file}` },
        hash: "#",
      });
    },
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
.router-link {
  text-decoration: none;
  color: #F4511E;
}
.router-link:hover {
  text-decoration: underline;
}
</style>