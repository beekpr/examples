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
import { mapActions, mapState } from 'vuex';

import ProfilesGrid from '~/components/ProfilesGrid.vue';

/**
 * Step 1: Specify widget type name
 *
 * In order for the home screen to be aware of the widget we need to register it. That's why we defined here
 * a unique string as widget type. We called it 'profiles' since this is the profiles widget.
 * See also the "Widget type" in the "Configuration" section on the developers portal
 * {@link https://developers.beekeeper.io/v2/welcome/home-screen}
 */
export const WIDGET_TYPE_NAME = 'profiles';
export const PROFILE_LIMIT = 50;


export default {
    components: {
        ProfilesGrid,
    },
    computed: {
        ...mapState(['profiles', 'initialized']),
    },
    props: {
        properties: {
            type: Object,
            default() {
                return {
                   maxNumberOfDisplayedProfiles: 12, 
                };
            }
        },
    },
    watch: {
        /**
         * Step 3: Trigger `widget-loaded` event
         *
         * Once the profiles are successfully loaded we notify the home screen by triggering an event
         */
        initialized(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.$emit('widget-loaded');
            }
        },
    },
    computed: {
        displayedProfiles() {
            return this.properties?.maxNumberOfDisplayedProfiles || PROFILE_LIMIT;
        },
    },
    created() {
        this.initStore(displayedProfiles);
    },
    methods: {
        ...mapActions({
            initStore: 'init',
            fetchProfiles: 'fetchProfiles',
        }),
    },
};
</script>
