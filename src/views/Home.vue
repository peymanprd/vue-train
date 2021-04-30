<template>
    <div class="container my-4 home">
        <label class="mb-1" for="users">select todo user id:</label>
        <input
            class="form-control mb-2"
            type="number"
            id="users"
            name="users"
            :placeholder="userID"
            v-model="userID"
            @input="filter"
        />
        <label class="mb-1" for="compelete">select todo status:</label>
        <div class="form-check form-switch mb-2">
            <input
                class="form-check-input"
                type="checkbox"
                name="compelete"
                id="compelete"
                v-model="isDone"
                @change="filter"
            />
        </div>

        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos">
                {{ todo.title }}
            </li>
        </ul>
        <div v-if="state" class="alert alert-danger" role="alert">
            There is no data!
        </div>
    </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: { Todo },
    data: () => ({
        todos: [],
        userID: 1,
        isDone: false,
        state: false,
    }),
    methods: {
        filter() {
            axios
                .get('https://jsonplaceholder.typicode.com/todos', {
                    params: { userId: this.userID, completed: this.isDone },
                })
                .then(res => {
                    this.todos = res.data
                    console.log(this.todos)

                    if (this.todos.length == 0) {
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
