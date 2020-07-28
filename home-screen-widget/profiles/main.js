import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

import component, { WIDGET_ID } from '~/profiles/components/Widget.vue';

import { initI18n } from '~/shared/i18n';

const BeekeeperMobileBridge = BeekeeperHomeScreen.bridge;

initI18n(BeekeeperMobileBridge.ui.locale)
    .then(() => BeekeeperHomeScreen.registerWidget(WIDGET_ID, component));
