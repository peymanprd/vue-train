<template>
    <div class="login-form form-floating mb-3">
        <div v-if="error" class="alert alert-danger">
            {{ error }}
        </div>

        <input
            v-model="userData.email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
        />
        <label for="floatingInput">ایمیل</label>
        <div class="form-floating mt-2">
            <input
                v-model="userData.password"
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="رمز عبور"
            />
            <label for="floatingPassword">رمز عبور</label>
        </div>
        <div class="d-grid gap-2">
            <button
                @click.prevent="login"
                class="btn btn-primary py-2 mt-4"
                type="button"
            >
                ورود
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import state from '@/store/helpers'

export default {
    name: 'loginPage',
    data: () => ({
        userData: {
            email: null,
            password: null,
        },
        state,
        error: '',
    }),
    computed: {
        ...mapState('user', ['userResult']),
    },
    methods: {
        login() {
            if (
                this.userData.email === null &&
                this.userData.password === null
            ) {
                this.error = 'هیچکی توش نیست!'
            } else {
                this.$store.dispatch('user/login', this.userData).then(() => {
                    this.state.isAuth = true
                    console.log(this.state.isAuth)
                    this.$router.push({ name: 'Home' })
                })
            }
        },
    },
    created() {
        console.log(this.state.isAuth)
    },
}
</script>

<style lang="sass">
.login-form
    width: 404px
    margin: 212px auto
</style>
