<template>
    <h5>PRODUCTS</h5>
    <button @click="getProducts" class="btn btn-primary mb-2">
        <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
        <span v-if="isLoading">صبر کن یکم...</span>
        <span v-if="!isLoading">مردم را نیشان بده</span>
    </button>

    <div v-for="product in products" :key="product.id" class="my-2">
        <button
            @click="addProduct(product)"
            class="btn btn-outline-dark btn-sm ml-2"
        >
            ADD
        </button>
        {{ `[ ${product.name} ]` }}
    </div>
    <hr />
    <ul>
        <li v-for="candid in candids" :key="candid.id">
            {{ `${candid.count} &#8759; [ ${candid.name} ]` }}
        </li>
    </ul>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'test',
    data: () => ({
        isLoading: false,
    }),
    computed: {
        ...mapState('products', ['products', 'candids']),
    },
    methods: {
        getProducts() {
            this.isLoading = true
            this.$store
                .dispatch('products/getProducts')
                .then(() => (this.isLoading = false))
        },
        addProduct(product) {
            this.$store.dispatch('products/addProduct', product)
        },
    },
}
</script>
