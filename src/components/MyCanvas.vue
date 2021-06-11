<template>
    <div :ref="reference" :class="class" tabindex="-1" :id="id">
        <header class="offcanvas-header">
            <slot name="header"></slot>
        </header>
        <section class="offcanvas-body">
            <slot name="body"></slot>
        </section>
    </div>
</template>
<script>
export default {
    name: 'MyCanvas',
    props: {
        class: {
            type: String,
        },
        id: {
            type: [String, Number],
        },
        reference: {
            type: String,
            default: 'mycanvas',
        },
    },
}
</script>
