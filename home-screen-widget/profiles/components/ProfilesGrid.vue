<template>
    <div :class="['profiles-grid', gridLayoutClassName]">
        <ProfileCell
            v-for="(profile, index) in profiles"
            :key="`${profile.id}`"
            class="profiles-grid__cell"
            :profile="profile"
            :item-offset="index"
        />
    </div>
</template>

<script>
import ProfileCell from '~/profiles/components/ProfileCell.vue';


export default {
    components: {
        ProfileCell,
    },
    props: {
        profiles: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    computed: {
        gridLayoutClassName() {
            if (this.profiles.length < 4) {
                return 'profiles-grid--single-column';
            }
            if (this.profiles.length === 4) {
                return 'profiles-grid--four-cells';
            }
            return 'profiles-grid--many-columns';
        },
    },
};
</script>

<style scoped>
.profiles-grid {
    --grid-gutter: 12px;
    --cell-height: 100px;
    --cell-width: 100px;

    display: grid;
    gap: var(--grid-gutter);
    overflow-x: auto;
    overflow-y: visible;
    padding: 0 16px 12px 16px;
    grid-auto-rows: var(--cell-height);
}

.profiles-grid::-webkit-scrollbar {
    width: 0 !important;
}

.profiles-grid.profiles-grid--many-columns:after, .profiles-grid.profiles-grid--four-cells:after {
    content: "";
    display: block;
    width: 4px;
    padding-right: 0;
    grid-row: 1 / 4;
}

.profiles-grid.profiles-grid--many-columns {
    grid-auto-columns: var(--cell-width);
    grid-template-rows: repeat(3, var(--cell-height));
    grid-template-columns: repeat(auto-fill, var(--cell-width));
    grid-auto-flow: column;
}

.profiles-grid.profiles-grid--single-column {
    grid-auto-columns: var(--cell-width);
    grid-template-rows: repeat(1, var(--cell-height));
}

.profiles-grid.profiles-grid--four-cells {
    grid-template-columns: repeat(2, var(--cell-width));
    grid-template-rows: repeat(2, var(--cell-height));
    grid-auto-flow: column;
}
</style>
