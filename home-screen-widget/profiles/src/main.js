import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';
import component, { WIDGET_ID } from '~/components/Widget.vue';

/**
 * Step 2: Register widget component
 *
 * This is the entry point of your widget and here we need to register
 * the component with its widget id into the home screen
 */
BeekeeperHomeScreen.registerWidget(WIDGET_ID, component);
