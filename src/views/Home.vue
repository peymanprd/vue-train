<template>
    <div class="home mt-4">
        <div class="my-2" v-for="(user, index) in users" :key="user.id">
            <button @click="addUser(index)" class="btn btn-primary">+</button>
            {{ user.name + ' : ' + user.count }}
        </div>
        <hr class="my-4" />
        <div v-if="admins">
            <div v-for="admin in admins" :key="admin.id">
                {{ admin.name + ' : ' + admin.count }}
            </div>
        </div>
    </div>
</template>

<script>
import API_Service from '../services/api'
import { ref, reactive } from 'vue'

export default {
    name: 'Home',
    setup() {
        const user = ref({})
        const users = ref()
        const admins = ref([])

        function fetchUsers() {
            API_Service.getUsers()
                .then(res => {
                    users.value = res.data
                })
                .catch(err => err)
        }

        function addUser(index) {
            user.value = users.value[index]
            console.log(user.value)

            if (!admins.value.length && admins.value.length <= 0) {
                user.value.count = 1
                admins.value.push(user.value)
            } else {
                let whichUser
                let existing = admins.value.filter((item, key) => {
                    if (item.id === user.value.id) {
                        whichUser = key
                        return true
                    } else {
                        return false
                    }
                })
                if (existing.length) {
                    admins.value[whichUser].count++
                } else {
                    user.value.count = 1
                    admins.value.push(user.value)
                }
            }

            console.log(admins.value)
        }

        return { user, users, fetchUsers, admins, addUser }
    },
    created() {
        this.fetchUsers()
    },
}
</script>
