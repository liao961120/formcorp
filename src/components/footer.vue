<template>
    <v-footer
      v-bind="localAttrs"
      :padless="padless"
      absolute
      height="0"
      class="d-none d-md-block d-lg-block d-xl-block"
      style="z-index: 10"
    >
      <v-card
        flat
        tile
        width="100%"
        class="grey darken-3 text-center"
      >

        <v-divider></v-divider>

        <v-row class="white--text">
          <v-col cols="6">
          <v-card-text class="text-left ml-10">
            106 臺北市大安區羅斯福路四段一號 樂學館 <br>
            計畫負責人：宋麗梅 <br>
            電子郵件：limay@ntu.edu.tw <br>
            電話：(02) 33664104#308<br>
            傳真：(02) 23635358
          </v-card-text>

          </v-col>

          <v-col cols="6">
            <v-img src="@/assets/ntulogo-black2.png" max-width="65%" class="mt-6 mr-13 ml-auto"></v-img>
          </v-col>
            
        </v-row>

        <v-card-text class="white--text">
          Copyright © 2020-{{ new Date().getFullYear() }} <strong>臺灣大學語言學研究所</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>


<script>
  export default {
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: true,
      variant: 'default',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = true
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>