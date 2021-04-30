<template>
    <div class="container my-4 home">
        <Todo />
        <label for="users">select todo id:</label>
        <input
            class="form-control"
            type="number"
            id="users"
            name="users"
            :placeholder="userID"
            v-model="userID"
            @input="filter"
        />
        <div class="form-check form-switch">
            <input
                class="form-check-input"
                type="checkbox"
                name="compelete"
                id="compelete"
                v-model="isDone"
                @change="filter"
            />
        </div>

        <ul>
            <li v-for="todo in todos">{{ todo.title }}</li>
        </ul>
    </div>
</template>

<script>
import Todo from '@/components/Todo.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: { Todo },
    data: () => ({
        userID: 1,
        isDone: false,
        todos: [],
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
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    created() {},
}
</script>
