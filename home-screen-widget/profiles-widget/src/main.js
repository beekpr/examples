import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

import component, { WIDGET_ID } from '~/Widget.vue';

const BeekeeperMobileBridge = BeekeeperHomeScreen.bridge;

// eslint-disable-next-line no-unused-vars
async function init(locale) {
    /* Initialization work before the widget component is getting rendered (e.g. loading
     * translations) can be put here */
}

/**
 * Step 2: Register widget component
 *
 * This is the entry point of your widget and here we need to register
 * the component with its widget id into the home screen
 */
init(BeekeeperMobileBridge.ui.locale)
    .then(() => BeekeeperHomeScreen.registerWidget(WIDGET_ID, component));
