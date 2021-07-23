<template>
    <label v-if="label" :for="name">{{ label }}</label>
    <input
        :value="modelValue"
        @input="onInput"
        @focus="$event.target.select()"
        :type="inputType"
        :name="name"
        class="form-control"
        :autocomplete="autocomplete"
    />
</template>

<script>
import { nextTick } from 'vue'

export default {
    name: 'BaseInput',
    props: {
        label: String,
        name: String,
        modelValue: [Number, String],
        maxValue: Number,
        inputType: {
            type: String,
            default: 'text',
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
    },
    setup(props, { emit }) {
        function onInput(event) {
            const newValue = parseInt(event.target.value)
            const finalValue = Math.min(newValue, props.maxValue)
            if (props.inputType == 'number' && props.maxValue) {
                emit('update:modelValue', newValue)
                nextTick(() => emit('update:modelValue', finalValue))
            } else {
                emit('update:modelValue', newValue)
            }
        }

        return { onInput }
    },
}
</script>
