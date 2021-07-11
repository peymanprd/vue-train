<template>
    <h5>PRODUCTS</h5>
    <button @click.prevent="myt.show()" class="btn btn-success">
        show toast
    </button>
    <toasti ref="myt" @hide="myt.hide()">
        <template #message>salam kon</template>
    </toasti>
    <input type="number" v-model="hasan" />
    <button @click="getProducts" class="btn btn-primary mb-2">
        <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
        <span v-if="isLoading">wait...</span>
        <span v-if="!isLoading">fetch products list</span>
    </button>

    <div v-for="product in products" :key="product.id" class="my-2">
        <button
            @click="sendProduct(product)"
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { Toast } from 'bootstrap'
import toasti from '@/components/Toast'

export default {
    name: 'test',
    components: { toasti },
    data: () => ({
        isLoading: false,
        myt: null,
        hasan: 0,
    }),
    watch: {
        storeID() {
            this.getProducts()
        },
    },
    computed: {
        ...mapState('products', ['products', 'candids']),
        ...mapGetters('products', ['storeID']),
    },
    methods: {
        ...mapActions('products', ['getProducts', 'addProduct']),
        sendProduct(product) {
            this.addProduct(product)
            console.log(product)
        },
    },
    mounted() {
        this.myt = new Toast(this.$refs.myt)
        // this.myt.show()
        console.log(this.myt)
    },
}
</script>
