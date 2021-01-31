<template>
    <v-footer
      v-bind="localAttrs"
      :padless="padless"
      absolute
      height="15"
      class="d-none d-md-block d-lg-block d-xl-block"
    >
      <v-card
        flat
        tile
        width="100%"
        class="grey darken-3 text-center"
      >
        <!-- <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text> -->

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Copyright © {{ new Date().getFullYear() }} <strong>臺灣大學語言學研究所</strong>
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