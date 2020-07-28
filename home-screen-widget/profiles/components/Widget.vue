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
 * This is the unique widget identifier that will be used
 * to register the widget in the home screen
 */
export const WIDGET_ID = 'profiles';

const { mapState, mapActions } = createNamespacedHelpers(WIDGET_ID);


export default {
    components: {
        ProfilesGrid,
    },
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
