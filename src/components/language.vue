<template>
    <div class="langauges d-flex flex-wrap justify-space-around pa-2">
      <template v-for="(content, lang) in data">
        <v-card :key="lang" class="mb-4" width="32%" min-width="210">
          <v-card-title>
              <b v-if="$i18n.locale == 'tw'">{{ langInfo[lang].name }}</b>
              <b v-else>
                {{ lang.split("_")[0] }}
                <template v-if="lang.split('_')[0] != lang.split('_')[1]">({{ lang.split("_")[1] }})</template>
              </b>
          </v-card-title>
          <v-card-subtitle>
            <template v-if="$i18n.locale == 'tw'">
              {{ lang.split("_")[0] }}
              <template v-if="lang.split('_')[0] != lang.split('_')[1]">({{ lang.split("_")[1] }})</template>
            </template>
            <template v-else>
              {{ langInfo[lang].name }}
            </template>
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
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'"
                      >mdi-information-outline</v-icon
                    >
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.9em"
                      >{{ $t("IU數") }}</span
                    >
                    <span style="display: inline-block">
                      {{ content.summary.story.iu_num }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon :class="hover ? '' : 'transparent--text'">
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'"
                      >mdi-lead-pencil</v-icon
                    >
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.9em"
                      >{{ $t("句數") }}</span
                    >
                    <span style="display: inline-block">
                      {{
                        content.summary.story.sent_num +
                        content.summary.sentence.sent_num
                      }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon :class="hover ? '' : 'transparent--text'">
                    <v-icon :class="hover ? 'grey--text' : 'transparent--text'"
                      >mdi-av-timer</v-icon
                    >
                    <span
                      :class="hover ? 'pl-2 grey--text text--darken-2' : ''"
                      style="display: inline-block; min-width: 5.9em"
                      >{{ $t("長度") }}</span
                    >
                    <span style="display: inline-block">
                      {{ formatTime(content.summary.story.record_time) }}
                    </span>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-hover>
          </v-img>

          <div class="my-2 text-center">
            <TextInfo
              :title="$t('句子')"
              :texttype="'Sentence'"
              :btnColor="'deep-orange darken-1'"
              :meta="content.text.filter((elem) => elem.type == 'Sentence')"
              :language="lang"
            ></TextInfo>
            
            <span class="mx-1"></span>

            <TextInfo
              :title="$t('故事')"
              :texttype="'Story'"
              :btnColor="'info'"
              :meta="content.text.filter((elem) => elem.type != 'Sentence' & elem.type != 'GrammarBook')"
              :language="lang"
            ></TextInfo>

            <span class="mx-1"></span>

            <TextInfo
              :title="$t('語法書')"
              :reference="langInfo[lang].ref"
              :texttype="'GrammarBook'"
              :btnColor="'warning darken-1'"
              :meta="content.text.filter((elem) => elem.type == 'GrammarBook')"
              :language="lang"
            ></TextInfo>

            <span class="mx-1"></span>

            <TextInfo
              :title="$t('詞類專書')"
              :texttype="'WordClass'"
              :btnColor="'lime darken-4'"
              :meta="content.text.filter((elem) => elem.type == 'WordClass')"
              :language="lang"
            ></TextInfo>
            <!-- <v-btn 
              small
              color="warning lighten-1`"
              :href="langInfo[lang].bookURL"
              target="_blank"
              :disabled="langInfo[lang].bookURL == ''"
              :dark="langInfo[lang].bookURL != ''"
            >
              <b>{{ $t('語法書') }}</b>
            </v-btn>
             -->
          </div>
        </v-card>
      </template>
    </div>
</template>

<script>
import TextInfo from "@/components/textInfo.vue";

export default {
  components: {
    TextInfo,
  },
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
  },
  data() {
    return {
      data: {},
      database: "https://yongfu.name/glossParser/text-meta.json",
      langInfo: {
        Rukai_Vedai: {
          name: "魯凱語 (霧台)",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=8&p=2",
          ref: "",
          },
        Amis_Ciwkangan: {
          name: "阿美語 (長光)",
          bookURL: "",
          ref: "",
          },
        "Saisiyat_Tong-he": {
          name: "賽夏語 (東河)",
          bookURL: "",
          ref: "",
          },
        Sakizaya_Sakizaya: {
          name: "撒奇萊雅語",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=14&p=2",
          ref: "沈文琦。2018。《撒奇萊雅語語法概論》，台灣南島語言叢書12。新北市：原住民族委員會。",
          },
        Kavalan_Xinshe: {
          name: "噶瑪蘭語 (新社)",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=10&p=2",
          ref: "",
          },
        Atayal_Mayrinax: {
          name: "泰雅語 (汶水)",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=2&p=2",
          ref: "",
          },
        Seediq_Tgdaya: {
          name: "賽德克語 (Tgdaya)",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=5&p=2",
          ref: "宋麗梅。2018。《賽德克語語法概論》，台灣南島語言叢書5。新北市：原住民族委員會。",
          },
        Tsou_Tsou: {
          name: "鄒語",
          bookURL: "",
          ref: "",
          },
        Bunun_Isbukun: {
          name: "布農語 (Isbukun)",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=6&p=2",
          ref: "",
          },
        Kanakanavu_Kanakanavu: {
          name: "卡那卡那富語",
          bookURL: "http://ilrdc.tw/grammar/index.php?l=15&p=2",
          ref: "宋麗梅。2018。《卡那卡那富語語法概論》，台灣南島語言叢書16。新北市：原住民族委員會。",
          },
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