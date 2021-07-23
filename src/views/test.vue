<template>
    <Input
        v-model="taxPercent"
        :maxValue="100"
        inputType="number"
        label="tax"
        name="tax"
    />

    <Input v-model="username" label="username" name="username" />
</template>

<script>
import { ref } from 'vue'
import Input from '@/components/BaseInput'

export default {
    name: 'Form',
    components: { Input },
    setup() {
        const taxPercent = ref(0)
        const username = ref(null)

        return { taxPercent, username }
    },
}
</script>
