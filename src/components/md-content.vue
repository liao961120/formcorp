<template>
  <div class="md-content" v-html="rawHTML"></div>
</template>

<script>

export default {
  data() {
    return {
      rawHTML: "",
    };
  },
  computed: {
    src() {
      return `https://yongfu.name/formcorp-content/${this.$route.name.toLowerCase()}.html.txt`;
    },
  },
  created: function () {
    this.$http.get(this.src).then(function (data) {
      this.rawHTML = data.body;
    });
  },
};
</script>


<style lang="scss">
// The html is generated with Pandoc
.md-content {
  font-size: 1.05em;
  width: 80%;
  text-align: justify;
  margin: 0 auto 2em auto;
  padding: 0 auto;

  h1 {
    font-size: 2.3em;
  }
  h1:after {
    content: " ";
    display: block;
    margin-bottom: 1em;
    border: 1px solid rgba(185, 185, 185, 0.664);
  }
  p {
    margin: 1em 0;
  }
  .float-right {
    max-width: 25%;
    float: right;
    margin-left: 0.85em;
  }
  .references::before {
    content: "相關文獻";
    display: block;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.5em 0 0.3em 0;
  }
  .references > .csl-entry {
    padding-left: 2.5em;
    text-indent: -2.5em;
    margin-bottom: 0.3em;
  }
  .citation > a {
    text-decoration: none;
  }
  .citation > a:hover {
    text-decoration: underline;
  }
  section {
    margin-top: 1.8em;
  }
}

@media screen and (max-width: 800px) {
  .md-content {
    width: 100%;
  }
}
</style>