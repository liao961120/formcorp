<template>
    <div>
        <div class="text">
            <template v-for="(res, i) in text.glosses">
                <Leipzig v-bind:gloss="res[1]" v-bind:showplaintext="false" :key="i" />
            </template>
        </div>
        
        <!-- Left drawer -->
        <LeftDrawer v-bind:drawer="drawer"></LeftDrawer>

    </div>
</template>

<script>
import Leipzig from "@/components/LeipzigLongText.vue";
import LeftDrawer from "@/components/leftDrawer.vue"

export default {
    components: {
        Leipzig,
        LeftDrawer
    },
    created: function() {
        this.$http.get(this.src).then(function(data) {
            this.text = data.body;
        });
    },
    data() {
        return {
            text: {},
            src: `https://yongfu.name/glossParser/json-long-text/${this.$route.query.id}.mp3.json`,
            drawer: null,
        }
    }
}
</script>

<style scoped>
.text {
    width: 100%;
    text-align: left;
    font-size: 1.18em;
}

.text > div {
    padding: 0.5em;
    border-radius: 10px;
    margin-bottom: 1em;
}

.text > div:nth-child(2n + 1) {
    background: rgba(197, 197, 197, 0.212);
    border: solid 2px white;
}
.text > div:nth-child(2n + 1):hover {
    background: rgba(223, 223, 223, 0.3);
    border: solid 2px rgba(197, 197, 197, 0.63);
}
.text > div:nth-child(2n) {
    border: solid 2px rgba(211, 211, 211, 0.452);
}
.text > div:nth-child(2n):hover {
    background: rgba(230, 230, 230, 0.171);
    border: solid 2px rgba(197, 197, 197, 0.63);
}
</style>