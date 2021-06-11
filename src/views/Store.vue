<template>
    <div v-for="user in allUsers" :key="user.id">
        <button
            @click="editUser(user), myModal.show()"
            class="btn btn-sm btn-light my-2"
        >
            {{ user.name }}
        </button>
    </div>

    <!-- Button trigger modal -->
    <button @click="myModal.show()" type="button" class="btn btn-primary">
        Launch static backdrop modal
    </button>

    <!-- Modal -->
    <div ref="myModal" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ takUser.name }}
                    </h5>
                    <button
                        @click="myModal.hide()"
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <input
                        v-model="takUser.name"
                        type="text"
                        class="form-control"
                    />
                </div>
                <div class="modal-footer">
                    <button
                        @click="myModal.hide()"
                        type="button"
                        class="btn btn-secondary"
                    >
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Understood
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Modal } from 'bootstrap'
export default {
    name: 'userTest',
    data: () => ({
        myModal: null,
        userss: [],
        singleUser: {},
    }),
    computed: {
        ...mapState(['allUsers', 'takUser']),
    },
    methods: {
        users() {
            this.$store.dispatch('getUsers')
        },
        editUser(user) {
            this.$store.dispatch('editUser', user)
            
            console.log(user)

            // this.userss = this.users
            // let userlar = this.userss[index]
            // // this.singleUser = userlar
            // this.singleUser = { name: userlar.name }
        },
    },
    created() {
        this.users()
    },
    mounted() {
        this.myModal = new Modal(this.$refs.myModal)
        console.log(this.myModal)
    },
}
</script>
