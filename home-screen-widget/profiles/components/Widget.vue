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
 * In order for the home screen to be aware of  the widget we need to register it. That's why we defined here
 * a unique widget string id that will identify our widget type.
 * We called it 'profiles' since this is the profiles widget
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
     * Once the widget is registered, the home screen will try to instantiate it and assign and instance id.
     * This will be used by the home screen to manage all widgets and listen to events.
     * In order for this to work, we therefore need a vue prop called 'widgetInstanceId'.
     */
    props: {
        widgetInstanceId: {
            type: String,
            required: true,
        },

        /**
         * Step 6: Define customizable input props
         *
         * Every widget can have input properties that be customized by admins.
         * In this example for different widget instances one might want to display more or less profiles.
         * The default is now set to 50.
         *
         */
        maxNumberOfDisplayedProfiles: {
            type: Number,
            required: false,
            default() {
                return PROFILE_LIMIT;
            }
        },
    },
    computed: {
        ...mapState(['profiles', 'initialized']),
    },
    watch: {
        /**
         * Step 5: Trigger LOADED event
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
        this.$store.registerModule(WIDGET_ID, store, { preserveState: false });
    },
    created() {
        this.initStore();
        this.fetchProfiles(this.maxNumberOfDisplayedProfiles);
    },
    methods: {
        ...mapActions({
            initStore: 'init',
            fetchProfiles: 'fetchProfiles',
        }),
    },
};
</script>
