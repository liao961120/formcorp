<template>
  <div>
    <div class="langauges d-flex flex-wrap">
      <template v-for="(content, lang) in data">
        <v-card :key="lang" class="mx-2 mb-4" width="31%" min-width="210">
          <v-card-title>
            <b>{{ langNames[lang] }}</b>
          </v-card-title>
          <v-card-subtitle>
            {{ lang.split("_")[0] }}
          </v-card-subtitle>

          
          <v-img
            :src="
              require(`@/assets/lang/${lang.split('_')[0].toLowerCase()}.jpg`)
            "
          >
            <!-- `@/assets/lang/${lang.split('_')[0].toLowerCase()}.jpg` -->
            <!-- `http://203.66.168.190/images/mainpic_${lang.split('_')[0].toLowerCase()}.jpg` -->
            <v-hover v-slot="{ hover }">
              <v-list
                dense
                class="body-2 mb-0 pb-4"
                :color="hover ? 'white' : 'transparent'"
              >
              <!-- :color="hover ? 'white' : 'transparent'" -->
                <v-list-item>
                  <v-list-item-icon :class="hover ? '' : 'transparent--text'">
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'">mdi-lead-pencil</v-icon>
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.5em"
                      >句數</span
                    >
                    <span style="display: inline-block">
                      {{ content.summary.sent_num }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon :class="hover ? '' : 'transparent--text'">
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'">mdi-information-outline</v-icon>
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.5em"
                      >IU數</span
                    >
                    <span style="display: inline-block">
                      {{ content.summary.iu_num }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon :class="hover ? '' : 'transparent--text'">
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'">mdi-av-timer</v-icon>
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.5em"
                      >長度</span
                    >
                    <span style="display: inline-block">
                      {{ formatTime(content.summary.record_time) }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>

              </v-list>
              </v-hover>
          </v-img>
          
          <div class="my-3 text-center">
            <TextMeta
              :title="'故事'"
              :btnColor="'ml-0 deep-orange'"
              :meta="content.text"
              :language="lang"
            ></TextMeta>

            <TextMeta
              :title="'句子'"
              :btnColor="'mx-4 warning'"
              :meta="content.text"
              :language="lang"
            ></TextMeta>

            <TextMeta
              :title="'語法書'"
              :btnColor="'mr-0 info'"
              :meta="content.text"
              :language="lang"
            ></TextMeta>
          </div>
        </v-card>
      </template>
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
import TextMeta from "@/components/textMeta.vue";

export default {
  components: {
    LeftDrawer,
    TextMeta,
  },
  props: ["drawer"],
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