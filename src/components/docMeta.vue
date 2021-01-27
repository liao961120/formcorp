<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="red lighten-2" dark v-bind="attrs" v-on="on">
          語料檔資訊
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          語料檔資訊
        </v-card-title>

        <v-card-text>
          <div class="info-container">
            <template v-for="(value, name) in meta">
              <span
                v-if="(value != '') & (value != 'None')"
                :key="value + name"
              >
                <span style="display: inline-block; min-width: 5.5em"
                  >{{ name }}:</span
                >
                <strong style="display: inline-block">{{ value }}</strong>
                <br />
              </span>
            </template>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
              關閉
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: ["meta"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.info-container {
    margin-top: 1em;
}
</style>