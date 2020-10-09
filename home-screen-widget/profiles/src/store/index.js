import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

/**
 * Step 5: Fetch tenant data with the Beekeeper SDK
 *
 * Our profile widget will use the beekeeper sdk to fetch the first 50 user profiles
 * and display them in the widget. We do this here in the store.
 * Once the profiles are loaded we need to communicate the state change to the home screen.
 * For that we created the 'initialized' state variable that the widget can watch.
 */
export default {
    namespaced: true,
    state: () => ({
        profiles: [],
        initialized: false,
    }),
    mutations: {
        SET_PROFILES(state, { profiles }) {
            state.profiles = profiles;
        },
        FINISH_INIT(state) {
            state.initialized = true;
        },
    },
    actions: {
        async init({ dispatch, commit }, maxNumberOfFetchedProfiles) {
            await dispatch('fetchProfiles', { limit: maxNumberOfFetchedProfiles });
            commit('FINISH_INIT');
        },
        async fetchProfiles({ commit }, params = {}) {
            try {
                const profiles = await BeekeeperHomeScreen.sdk.Profiles.list(params);
                commit('SET_PROFILES', { profiles });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn(`Failed to fetch profiles with error: ${error.message}`);
            }
        },
    },
};
