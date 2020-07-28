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
 * Step 1: This is the vue component of your widget that will be loaded onto the home screen.
 *
 * In order for the home screen to be aware of  the widget we need to register it. That's why we defined here
 * a unique widget string id that will identify our widget type.
 * We called it 'profiles' since this is the profiles widget
 */
export const WIDGET_ID = 'profiles';

const { mapState, mapActions } = createNamespacedHelpers(WIDGET_ID);


export default {
    components: {
        ProfilesGrid,
    },
    /**
     * Step 3: Once the widget is registered, the home screen will try to instantiate it and assign and instance id.
     * This will be used by the home screen to manage all widgets and listen to events.
     * In order for this to work, we therefore need a vue prop called 'widgetInstanceId'.
     */
    props: {
        widgetInstanceId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState(['profiles', 'initialized']),
    },
    watch: {
        /**
         * Step 5
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
        this.fetchProfiles();
    },
    methods: {
        ...mapActions({
            initStore: 'init',
            fetchProfiles: 'fetchProfiles',
        }),
    },
};
</script>
