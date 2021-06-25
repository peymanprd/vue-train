<template>
    <h5>is test</h5>
    <div v-for="admin in admins" :key="admin.id">
        {{ admin.name }}
    </div>
</template>
<script>
export default {
    name: 'test',
    inject: ['admins'],
    created() {
        console.log(12)
    },
}
</script>
