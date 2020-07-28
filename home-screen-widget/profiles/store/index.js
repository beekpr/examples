import BeekeeperHomeScreen from '@beekeeper/home-screen-sdk';

const PROFILE_LIMIT = 50;

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
        async init({ dispatch, commit }) {
            await dispatch('fetchProfiles');
            commit('FINISH_INIT');
        },
        async fetchProfiles({ commit }) {
            try {
                const profiles = await BeekeeperHomeScreen.sdk.Profiles.list({ limit: PROFILE_LIMIT });
                commit('SET_PROFILES', { profiles });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn(`Failed to fetch profiles with error: ${error.message}`);
            }
        },
    },
};
