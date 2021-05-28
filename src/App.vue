<template>
    <div class="container">
        <div id="nav">
            <router-link :to="{ name: 'Home' }">Home</router-link>
            <router-link :to="{ name: 'About' }">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
