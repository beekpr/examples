<template>
    <ClickablePane @click="navigateToProfile">
        <div class="profile-cell">
            <div class="profile-cell__cover">
                <img
                    v-if="profile.avatar"
                    :src="profile.avatar"
                    :alt="profile.firstname"
                >
            </div>
            <div class="profile-cell__name">
                {{ profile.firstname ? profile.firstname : profile.name }}
            </div>
        </div>
    </ClickablePane>
</template>

<script>

import ClickablePane from '~/profiles/components/ClickablePane.vue';

export default {
    components: {
        ClickablePane,
    },
    props: {
        profile: {
            type: Object,
            required: true,
        },
        itemOffset: {
            type: Number,
            required: true,
        },
    },
    computed: {
        pathToProfile() {
            return `/profiles/${this.profile.id}`;
        },
    },
    methods: {
        navigateToProfile() {
            window.location.assign(this.pathToProfile);
        },
    },
};
</script>

<style scoped>
.profile-cell {
    --cell-height:100px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    width: 100px;
    overflow:hidden;
}

.profile-cell__cover {
    display: block;
    width: 60px;
    height: 60px;
}

.profile-cell__cover img {
    width: 100%;
    object-fit: cover;
    border-radius: 200px;
}

.profile-cell__name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline;
    max-width: 90px;
    font-family: sans-serif;
    font-weight: normal;
    font-size: 12px;
}

</style>
