<template>
    <div>
        <div class="widget__header">
            <!-- Put here the title of your widget -->
            Profiles
        </div>
        <ProfilesGrid :profiles="profiles" />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BeekeeperHomeScreen, { EventType } from '@beekeeper/home-screen-sdk';

import ProfilesGrid from '~/profiles/components/ProfilesGrid.vue';
import store from '~/profiles/store';

/**
 * Step 1: Define widget id
 *
 *
 * This is the vue component of your widget that will be loaded onto the home screen.
 * In order for the home screen to be aware of the widget we need to register it. That's why we defined here
 * a unique widget string id that will identify our widget type in the Beekeeper ecosystem.
 * We called it 'profiles' since this is the profiles widget.
 * See also the "Widget type" in the "Configuration" section on the developers portal
 * {@link https://developers.beekeeper.io/v2/welcome/home-screen}
 */
export const WIDGET_ID = 'profiles';
export const PROFILE_LIMIT = 50;

const { mapState, mapActions } = createNamespacedHelpers(WIDGET_ID);


export default {
    components: {
        ProfilesGrid,
    },
    /**
     * Step 3: Add widgetInstanceId prop
     *
     * Once the widget is registered, the home screen will try to instantiate it and assign an instance id.
     * This will be used by the home screen to manage all widgets and listen to events.
     * In order for this to work, we therefore need a vue prop called 'widgetInstanceId'.
     */
    props: {
        widgetInstanceId: {
            type: String,
            required: true,
        },

        /**
         * Step 7: Define customizable input props (Optional)
         *
         * Every widget can have input properties that can be customized by admins.
         * In this example for different widget instances one might want to display more or fewer profiles.
         * The default is now set to 50.
         *
         */
        maxNumberOfDisplayedProfiles: {
            type: Number,
            required: false,
            default() {
                return PROFILE_LIMIT;
            },
        },
    },
    computed: {
        ...mapState(['profiles', 'initialized']),
    },
    watch: {
        /**
         * Step 6: Trigger LOADED event
         *
         * Once the profiles are successfully loaded we notify the home screen by triggering an event
         * that contains the event type and the widget instance id
         */
        initialized(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                BeekeeperHomeScreen.triggerEvent(EventType.LOADED, this.widgetInstanceId);
            }
        },
    },
    beforeCreate() {
        /**
         * Step 4: Register widget store module (Optional: not needed for a static widget without store)
         *
         * In order for Vuex to be aware of this store, we need to register it upon widget creation.
         * When the module is registered, all of its getters, actions and mutations will be automatically
         * namespaced based on the path the module is registered at.
         */
        this.$store.registerModule(WIDGET_ID, store, { preserveState: false });
    },
    created() {
        this.initStore(this.maxNumberOfDisplayedProfiles);
    },
    methods: {
        ...mapActions({
            initStore: 'init',
            fetchProfiles: 'fetchProfiles',
        }),
    },
};
</script>
