<template>
    <div class="md-content" v-html="rawHTML"></div>
</template>

<script>
import marked  from 'marked';

export default {
  data() {
    return {
      rawHTML: "",
      baseURL: "./markdown"
    };
  },
  computed: {
    src() {
      if (this.$router.currentRoute.path != '/')
        return `${this.baseURL}/${this.$route.params.name.toLowerCase()}.md`;
      return `${this.baseURL}/home.md`;
    },
  },
  created: function () {
    this.$http.get(this.src).then(function (data) {
      this.rawHTML = marked(data.body, { smartypants: true });
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
    margin: 1.8em 0 0.3em 0;
  }
  .references > .csl-entry {
    padding-left: 2.5em;
    text-indent: -2.5em;
    margin-bottom: .85em;
    font-family: 'Times New Roman', Times, serif;
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
  dl {
    background: rgba(218, 197, 161, 0.431);
    border: 1px solid rgba(218, 197, 161);
    padding: 1em 1.3em 0em 1.3em;
    border-radius: 0.65em;
    width: 100%;
    margin: 0 auto;
  }
  dt {
    display: inline-block;
    font-weight: bold;
    color: rgb(255, 123, 0);
    border-bottom: 2px solid rgb(255, 123, 0);
    padding-bottom: 0;
  }

  dd p {
    margin-top: 0.5em;
  }
}

@media screen and (max-width: 800px) {
  .md-content {
    width: 100%;
  }
}
</style>