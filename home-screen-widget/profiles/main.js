import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

import component, { WIDGET_ID } from '~/profiles/components/Widget.vue';

import { initI18n } from '~/shared/i18n';

const BeekeeperMobileBridge = BeekeeperHomeScreen.bridge;
/**
 * Step 2: Register widget component
 *
 * This is the entry point of your widget and here we need to register
 * the component with its widget id into the home screen
 */
initI18n(BeekeeperMobileBridge.ui.locale)
    .then(() => BeekeeperHomeScreen.registerWidget(WIDGET_ID, component));
