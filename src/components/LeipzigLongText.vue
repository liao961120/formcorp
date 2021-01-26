<template>
    <div>
        <span class="gloss-src src-num">{{ gloss.num }}</span>

        <div class="example gloss--glossed">
            <p v-if="gloss.ori.length > 0" class="gloss__line--original gloss__line gloss__line--0">
                <span>{{ this.gloss.ori.join(" ") }}</span>
            </p>

            <!-- Glossed Lines -->
            <div class="gloss__words">
                <div
                    class="gloss__word"
                    v-for="(tup, idx) in this.gloss.gloss"
                    :key="idx + Math.random()"
                >
                    <p class="gloss__line gloss__line--1">
                        <span>{{ tup[0] }}</span>
                    </p>
                    <p class="gloss__line gloss__line--2">
                        <span>{{ tup[0] }}</span>
                    </p>
                    <p class="gloss__line gloss__line--3">
                        <span>{{ tup[0] }}</span>
                    </p>
                </div>
            </div>

            <!-- Free Lines -->
            <p
                v-for="(line, i) in this.gloss.free"
                :key="i + Math.random()"
                :class="`gloss__line--free gloss__line gloss__line--${i + 4}`"
            >
                <span>{{ line }}</span>
            </p>

            <template v-if="'video' in gloss.meta">
                <button 
                    v-if="gloss.iu_a_span[0] != null & gloss.iu_a_span[1] != null" 
                    v-on:click="playAudio(get_audio_url_by_split_time(gloss.iu_a_span[0], gloss.iu_a_span[1], gloss.meta.video))">
                <v-icon>mdi-play-circle-outline</v-icon>
                </button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: ["gloss", "showplaintext"],
    data() {
        return {
            audio_url: "https://yongfu.name/FormCorp-audio",  // no slash at end
            plain_text_gloss: "",
            /* See https://yongfu.name/gloss-search/2020_Budai_Rukai/data.json for data format*/
        };
    },
    methods: {
        playAudio(url) {
            var audio = new Audio(url);
            audio.volume = 1.0;
            audio.play();
        },
        toPlainText(gloss) {
            const ori =
                gloss.ori.length > 0 
                    ? gloss.ori.join(" ") + "\n\n" 
                    : "";
            const ori_align =
                gloss.gloss.length > 0
                    ? gloss.gloss.map(x => x[0]).join("\t") + "\n"
                    : "";
            const eng_align =
                gloss.gloss.length > 0
                    ? gloss.gloss.map(x => x[1]).join("\t") + "\n"
                    : "";
            const ch_align =
                gloss.gloss.length > 0
                    ? gloss.gloss.map(x => x[2]).join("\t") + "\n\n"
                    : "";
            const en_free = gloss.free[0] ? gloss.free[0] + "\n" : "";
            const ch_free = gloss.free[1] ? gloss.free[1] : "";

            this.plain_text_gloss = `${ori}${ori_align}${eng_align}${ch_align}${en_free}${ch_free}`;
            this.showplaintext = true;
        },

        get_audio_url_by_split_time(start_time, end_time, ori_audio) {
            const start = (start_time % 1 == 0) ? start_time + ".0" : start_time.toString();
            const end = (end_time % 1 == 0) ? end_time + ".0" : end_time.toString();
            return `${this.audio_url}/${ori_audio.replace(".mp3", "")}_${start}-${end}.mp3`;
        }
    },
};
</script>



<style scoped>
span.gloss-src {
    font-size: 0.75em;
}
span.src-num::after {
    content: ".";
}
span.src-doc {
    color: white;
    padding: 2px 5px;
    float: right;
    font-family: "Monaco", "Consolas", "Courier New", Courier, monospace;
    font-size: 0.63em;
}
span.gloss-src a {
    text-decoration: none;
}

.gloss--glossed:after {
    clear: left;
    content: "";
    display: block;
}

ul.gloss--glossed,
ol.gloss--glossed {
    padding-left: 0;
}

ul.gloss--glossed li,
ol.gloss--glossed li {
    list-style-type: none;
}

.gloss__abbr {
    font-variant: small-caps;
    font-variant-numeric: oldstyle-nums;
    text-transform: lowercase;
}

.gloss__word {
    float: left;
    margin-bottom: 1em;
    margin-right: 1em;
}

.gloss__word p {
    margin: 0;
}

.gloss--no-space .gloss__word {
    margin-right: 0;
}

.gloss--no-space .gloss__word.gloss__word--spacer {
    margin-right: 1.5em;
}

.gloss__words:first-child,
.gloss--glossed li:first-child {
    margin-top: 1em;
}

.gloss--glossed li:last-child {
    margin-bottom: 1em;
}

.gloss__word .gloss__line:first-child {
    font-style: italic;
}

.gloss__line--original {
    font-weight: bold;
    font-style: italic;
    word-spacing: 0.3em;
    font-family: "Times New Roman", Times, serif;
    margin-bottom: 0.6em;
}

.gloss__line--free,
.gloss__line--no-align {
    clear: left;
    margin: 0 0;
    font-family: "Times New Roman", Times, serif;
    font-size: 0.78em;
}

.gloss__line--hidden {
    display: none;
}

.gloss__line--1 {
    font-family: "Times New Roman", Times, serif;
}
.gloss__line--2 {
    font-family: "Times New Roman", Times, serif;
    font-size: 0.85em;
}
.gloss__line--3 {
    font-family: "Times New Roman", Times, serif;
    font-size: 0.85em;
}

.plain-text-gloss {
    display: block;
    width: 80%;
}
audio::-webkit-media-controls-panel, video::-webkit-media-controls-panel {
    background-color: rgba(204, 204, 204, 0.781);
    width: 35%;
}
</style>