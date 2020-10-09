<template functional>
    <button
        type="button"
        :class="['clickable-pane', data.class, data.staticClass]"
        v-bind="data.attrs"
        v-on="listeners"
    >
        <slot />
    </button>
</template>

<style scoped>
.clickable-pane {
    user-select: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    text-align: left;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(32, 32, 33, 0.1), 0 1px 2px rgba(32, 32, 33, 0.06);
    background: #ffffff;
    color: #000000;
}

.clickable-pane:hover, .clickable-pane:active {
    outline: none;
    border: none;
}
</style>
