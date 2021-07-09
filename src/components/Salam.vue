<template>
    <div :ref="refrence" class="divaneha">
        <h3>
            <slot name="title">hey</slot>
        </h3>
        <small>
            <slot name="summary">jizzeeeee</slot>
        </small>
    </div>
</template>
<script>
export default {
    name: 'Salam',
    props: {
        refrence: {
            type: String,
            default: 'divane',
        },
    },
}
</script>
