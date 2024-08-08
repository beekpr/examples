import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

import component, { WIDGET_TYPE_NAME } from '~/components/Widget.vue';
import store from '~/store';

/**
 * Step 2: Register widget component
 *
 * This is the entry point of your widget and here we need to register
 * the component with its widget id into the home screen
 */
BeekeeperHomeScreen.registerVueWidget(WIDGET_TYPE_NAME, component, {
    useStore: true,
    storeOptions: store,
});
