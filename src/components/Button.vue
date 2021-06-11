<template>
    <button :type="type" :class="class">
        <slot>دکمه هستم</slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'button',
        },
        class: {
            type: String,
        },
    },
}
</script>
