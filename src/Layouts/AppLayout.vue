<template>
    <div class="container">
        <div id="nav" class="my-4">
            <router-link
                v-if="!userPermision"
                :to="{ name: 'login' }"
                class="btn btn-link"
                >Login</router-link
            >
            <button
                v-else
                @click.prevent="logout"
                type="button"
                class="btn btn-link"
            >
                logout
            </button>
            <router-link :to="{ name: 'About' }" class="btn btn-link"
                >About</router-link
            >
            <router-link :to="{ name: 'intest' }" class="btn btn-link"
                >Intest Peo</router-link
            >
            <router-link :to="{ name: 'test' }" class="btn btn-link"
                >Test</router-link
            >
            <router-link :to="{ name: 'facture-store' }" class="btn btn-link">
                facture foroosh
            </router-link>
            <router-link :to="{ name: 'facture-order' }" class="btn btn-link">
                facture sefaresh
            </router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
import { userPermision } from '@/store/helpers'

export default {
    computed: {
        ...userPermision,
    },
    methods: {
        async logout() {
            await this.$store
                .dispatch('user/logout')
                .then(() => this.$router.push({ name: 'login' }))
        },
    },
}
</script>
<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
