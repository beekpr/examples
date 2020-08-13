const path = require('path');

module.exports = {
    configureWebpack: {
        /* Home screen provides copies of Vue and Vuex. Tell Webpack to use them instead of bundling
         * our own copy of them. */
        externals: {
            vue: 'Vue',
            vuex: 'Vuex',
        },
        output: {
            /* Make the output's file name static, as we need to reference them in the widget type
             * configuration later */
            filename: 'js/[name].js',
            /* Make sure to change `jsonpFunction` to something unique! Otherwise, there will be
             * potential clashes with other widgets' Webpack bundle that use bundle splitting */
            jsonpFunction: 'exampleProfilesWidget',
        },
        resolve: {
            /* Alias `~` to the source directory for more convenient imports. */
            alias: {
                '~': path.resolve(__dirname, 'src/'),
            }
        },
    },
    /* Some of our internal packages are not transpiled, so make sure that they are piped
     * through Babel. */
    transpileDependencies: [
        /@beekeeper\//,
    ],
};
