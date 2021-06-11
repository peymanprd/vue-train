<template>
    <div class="modal fade" tabindex="-1" :ref="ref">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        ref: {
            type: String,
            default: 'reference',
        },
    },
}
</script>
