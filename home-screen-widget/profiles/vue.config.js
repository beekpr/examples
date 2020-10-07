const path = require('path');

module.exports = {
    publicPath: '/home-screen-widget-profiles/',
    devServer: {
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    configureWebpack: {
        /**
         * Vue and Vuex will be provided by the Home Screen through the window.
         * Please do not include these dependencies to prevent unexpected
         * behavior.
         */
        externals: {
            vue: 'Vue',
            vuex: 'Vuex',
        },
        output: {
            filename: 'js/[name].js',
            /**
             * Since there are multiple webpack instances interoperating in the
             * Home Screen, you can not use the default name of the jsonp
             * function and chunckCallback name. Please choose a specific name
             * ending with -Jsonp and -ChunkCallback.
             */
            jsonpFunction: 'HomeScreenWidgetProfilesJsonp',
            chunkCallbackName: 'HomeScreenWidgetProfilesChunkCallback',
        },
        optimization: {
            /**
             * For caching purposes, please use only on bundle
             */
            splitChunks: false,
        },
        resolve: {
            alias: {
                '~': path.join(__dirname, 'src/'),
            },
        },
        module: {},
    },
    transpileDependencies: [
        /**
         * The @beekeeper/home-screen-sdk needs to be transpiled to be used in the bundle
         */
        /@beekeeper\//,
    ],
    filenameHashing: false,
    css: {
        /**
         * For caching purposes, please use only on bundle
         */
        extract: false,
    },
    pages: {
        profiles: {
            entry: './src/main.js',
        },
    },
};