<template>
    <div
        :ref="refrence"
        :class="[
            'toast',
            'align-items-center',
            'text-white',
            'border-0',
            bgColor ? bgColor : 'bg-primary',
        ]"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
    >
        <div class="d-flex">
            <div class="toast-body">
                <slot name="message">dfdsdfd</slot>
            </div>
            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                @click="hide()"
                aria-label="Close"
            ></button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        refrence: {
            type: String,
            default: 'myt',
        },
        bgColor: {
            type: String,
        },
    },
    methods: {
        hide() {
            this.$emit('hide')
        },
    },
}
</script>
