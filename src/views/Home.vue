<template>
    <div class="container my-4 home">
        <label class="mb-1" for="users">select user id:</label>
        <input
            class="form-control mb-2"
            type="number"
            id="users"
            name="users"
            :placeholder="userID"
            v-model="userID"
            @input="filter"
        />
        <ul class="list-group">
            <li class="list-group-item" v-for="user in users" :key="user.id">
                {{ user.name }}
                <div>
                    <small>{{ user.website }}</small>
                </div>
            </li>
        </ul>
        <div v-if="state" class="alert alert-danger" role="alert">
            There is no data!
        </div>
    </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
import API_SERVICE from '../services/APIService'

export default {
    name: 'Home',
    components: { Todo },
    data: () => ({
        users: [],
        userID: 1,
        isDone: false,
        state: false,
    }),
    methods: {
        filter() {
            API_SERVICE.getUsers(this.userID)
                .then(res => {
                    this.users = res.data
                    console.log(this.users)

                    if (this.users.length == 0) {
                        this.state = true
                    } else {
                        this.state = false
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    created() {
        this.filter()
    },
}
</script>
