<template>
  <div>
    <div class="langauges d-flex flex-wrap">
      <div v-for="(content, lang) in data" :key="lang" class="mx-2 mb-4">
        <v-card>
          <v-card-title v-text="langNames[lang]"></v-card-title>

            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lead-pencil</v-icon>
                  <span class="pl-2" style="display:inline-block;min-width:5.5em;font-weight:bold">句數</span>
                  <span style="display: inline-block">
                    {{ content.summary.sent_num }}
                  </span>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-information-outline</v-icon>
                  <span class="pl-2" style="display:inline-block;min-width:5.5em;font-weight:bold">IU數</span>
                  <span style="display: inline-block">
                    {{ content.summary.iu_num }}
                  </span>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-av-timer</v-icon>
                  <span class="pl-2" style="display:inline-block;min-width:5.5em;font-weight:bold">長度</span>
                  <span style="display: inline-block">
                    {{ formatTime(content.summary.record_time) }}
                  </span>
                </v-list-item-icon>
              </v-list-item>
            </v-list>

          <v-card-text>
            <StoryMeta v-bind:storyMeta="content.text" v-bind:langauge="lang"></StoryMeta>
          </v-card-text>
          
        </v-card>
      </div>
    </div>

    <!-- Top Menu bar -->
    <v-app-bar flat color="transparent" app min-width="330">
      <v-btn
        @click.stop="drawer = !drawer"
        icon
        depressed
        style="background: #ffd180"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-row justify="center" align="center">
        <v-spacer class="d-none d-md-flex mr-5"></v-spacer>
        <v-col class="d-none d-sm-flex"> </v-col>
      </v-row>
    </v-app-bar>

    <!-- Left drawer -->
    <LeftDrawer v-bind:drawer="drawer"></LeftDrawer>
  </div>
</template>

<script>
import LeftDrawer from "@/components/leftDrawer.vue";
import StoryMeta from "@/components/storyMeta.vue";

export default {
  components: {
    LeftDrawer,
    StoryMeta,
  },
  props: ["drawer"],
  methods: {
    formatTime: function(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.round(seconds % 60);
      return [
        h == 0 ? "" : `${h} 小時`,
        `${m > 9 ? m : (h ? '0' + m : m || '0')} 分`,
        `${s > 9 ? s : '0' + s} 秒`
      ].join(' ');
    }
  },
  data() {
    return {
      data: {},
      database: "https://yongfu.name/glossParser/long-text-meta.json",
      langNames: {
        Rukai_Vedai: "魯凱 (霧台)",
        Amis_Ciwkangan: "阿美 (長光)",
        "Saisiyat_Tong-he": "撒奇萊雅 (東河)",
        Sakizaya_Sakizaya: "撒奇萊雅",
        Kavalan_Xinshe: "葛瑪蘭 (新社)",
        Atayal_Mayrinax: "泰雅 (汶水)",
        Seediq_Tgdaya: "賽德克 (Tgdaya)",
        Tsou_TapangU: "鄒語 (TapangU)",
        Tsou_Tfya: "鄒語 (Tfya)",
        Kanakanavu_Kanakanavu: "卡那卡那富",
      },
    };
  },
  created: function () {
    this.$http.get(this.database).then(function (data) {
      this.data = data.body;
    });
  },
};
</script>

<style scoped>
</style>