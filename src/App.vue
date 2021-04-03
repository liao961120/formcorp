<template>
    <v-app id="inspire">
        <v-app-bar color="orange accent-4" dark app>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>說明文件</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </v-main>

        <!-- Scroll to Top/Bottom -->
        <v-speed-dial v-model="nav" fixed bottom right style="z-index: 1000">
            <template v-slot:activator>
                <v-btn v-model="nav" color="blue-grey" dark fab x-small>
                    <v-icon v-if="nav">mdi-close</v-icon>
                    <v-icon v-else>mdi-unfold-more-horizontal</v-icon>
                </v-btn>
            </template>
            <v-btn
                color="light-blue darken-4"
                dark
                small
                fab
                onclick="window.scrollTo(0, document.body.scrollHeight);"
            >
                <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn
                color="light-blue darken-4"
                dark
                small
                fab
                onclick="document.documentElement.scrollTop = 0;"
            >
                <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
        </v-speed-dial>

        <LeftDrawer :drawer="drawer"></LeftDrawer>
        <Footer></Footer>
    </v-app>
</template>

<script>
import Footer from "@/components/footer.vue";
import LeftDrawer from "@/components/leftDrawer.vue";

export default {
    components: {
        LeftDrawer,
        Footer,
    },
    props: {
        source: String,
    },
    data: () => ({
        nav: false,
        drawer: false,
    }),
};
</script>

<style>
html {
    overflow-y: scroll;
    scroll-behavior: smooth !important;
}
textarea {
    font-family: "Monaco", "Courier New", Courier, monospace !important;
}
</style>