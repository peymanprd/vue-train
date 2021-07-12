<template>
    <h5>PRODUCTS</h5>
    <!-- <button @click.prevent="myt.show()" class="btn btn-success">
        show toast
    </button>
    <toasti ref="myt" @hide="myt.hide()">
        <template #message>salam kon</template>
    </toasti> -->
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
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div v-for="product in products" :key="product.id" class="card">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.quantity }}</p>
                <button @click="sendProduct(product)" class="btn btn-success">
                    ADD
                </button>
            </div>
            <div class="card-footer">
                <small class="text-muted">{{
                    'Cost is : ' + product.cost
                }}</small>
            </div>
        </div>
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
// import toasti from '@/components/Toast'

export default {
    name: 'test',
    // components: { toasti },
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
        },
    },
    mounted() {
        console.log(this.storeID + 1)
        // this.myt = new Toast(this.$refs.myt)
        // this.myt.show()
        // console.log(this.myt)
    },
}
</script>
