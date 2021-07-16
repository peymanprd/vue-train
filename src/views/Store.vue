<template>
    <h5>{{ label + ' type is : ' + type }}</h5>

    <button @click="resetState" class="btn btn-danger">reset state</button>

    <template v-if="!isLoading">
        <div
            class="d-flex p-2 shadow-sm my-2"
            v-for="product in mediator[type].products"
            :key="product.id"
        >
            <div class="flex-shrink-0">
                <img :src="product.img" width="80" />
            </div>
            <div class="flex-grow-1 ms-3">
                <h6>{{ product.name }}</h6>
                <button
                    @click="addProduct(product)"
                    class="btn btn-primary"
                    type="button"
                >
                    Add kon
                </button>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="d-flex justify-content-center">
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </template>

    <hr />
    <div v-for="fProduct in facture[type].products">
        <img :src="fProduct.img" width="80" />
        <p>
            <small class="danger">{{ fProduct.count }}</small>
        </p>
        <h5>{{ fProduct.name }}</h5>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'facture',
    props: ['type', 'label'],
    computed: {
        ...mapState(['isLoading']),
        ...mapState('products', ['mediator', 'facture']),
    },
    methods: {
        ...mapActions('products', [
            'getProducts',
            'addProduct',
            'setFactureType',
            'resetFacture',
        ]),
        resetState() {
            this.resetFacture()
        },
        initSetup() {
            this.setFactureType(this.type)
            if (!this.mediator[this.type].products.length) this.getProducts()
        },
        addProductToFacture(product) {
            this.addProduct(product)
        },
    },
    beforeUpdate() {
        this.initSetup()
    },
    created() {
        this.initSetup()
    },
}
</script>
