<!-- <template>
    <div class="home mt-4">
        <DatePicker v-model="state.date" />

        <div>
            <input class="form-control" v-model="qty" @input="handleQty" />
            {{ formattedQty }}
        </div>
        <div id="canvasOption">
            <button
                class="btn btn-primary"
                type="button"
                data-bs-target="#offcanvasBottom"
                @click.prevent="myCanvas.show()"
            >
                Toggle bottom offcanvas
            </button>

            <div
                ref="mycanvas"
                class="offcanvas offcanvas-bottom"
                tabindex="-1"
                id="offcanvasBottom"
            >
                <div class="offcanvas-header bg-light">
                    <h5 class="offcanvas-title">
                        canvas title
                    </h5>
                    <button
                        type="button"
                        class="btn-close text-reset"
                        @click.prevent="myCanvas.hide()"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="offcanvas-body">
                    Content for the offcanvas goes here. You can place just
                    about any Bootstrap component or custom elements here.
                </div>
            </div>
        </div>

        <div class="my-2" v-for="(user, index) in users" :key="user.id">
            <button
                @click="userItem(user), modal.toggle()"
                class="btn btn-primary"
            >
                +
            </button>
            <button
                @click="addUser(index)"
                type="button"
                class="btn btn-success"
            >
                Add Kon
            </button>
            {{ user.name + ' : ' + user.count }}
        </div>
        <button @click="toast.show()" type="button" class="btn btn-primary">
            پیام صدر اعظم
        </button>

        <div
            class="toast align-items-center text-white bg-dark border-0 mt-2"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref="target"
        >
            <div class="d-flex">
                <div class="toast-body">
                    صنعت چاپ و با استفاده از طراحان گرافیک است.
                </div>
                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    @click="toast.hide()"
                    aria-label="Close"
                ></button>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" ref="reference">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ item.name }}</h5>
                        <button
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                            @click="modal.hide()"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <p>{{ item.website }}</p>
                        <small
                            >پیر مردی هر روز تو محله می دید پسر کی با کفش های
                            پاره و پای برهنه با توپ پلاستیکی فوتبال بازی می کند،
                            روزی رفت ی کتانی نو خرید و اومد و به پسرک گفت بیا
                            این کفشا رو بپوش…پسرک کفشا رو پوشید و خوشحال رو به
                            پیر مرد کرد و گفت: شما خدایید؟! پیر مرد لبش را گزید
                            و گفت نه! پسرک گفت پس دوست خدایی، چون من دیشب فقط به
                            خدا گفتم كه کفش ندارم…
                        </small>
                    </div>
                    <div class="modal-footer">
                        <button
                            @click="modal.hide()"
                            type="button"
                            class="btn btn-secondary"
                        >
                            انصراف
                        </button>
                        <button
                            @click="addUser(index)"
                            type="button"
                            class="btn btn-primary"
                        >
                            ثبت تغییرات
                        </button>
                    </div>
                </div>
            </div>
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
import { ref, reactive, computed, watchEffect } from 'vue'
import { Modal } from 'bootstrap'
import { Toast } from 'bootstrap'
import { Offcanvas } from 'bootstrap'
import TestModal from '../components/Modal'
import MyCanvas from '../components/MyCanvas'
import DatePicker from '../components/DatePicker'

export default {
    name: 'Home',
    components: { TestModal, DatePicker, MyCanvas },
    setup() {
        const user = ref({})
        const users = ref()
        const admins = ref([])
        const date = ref('1399/12/16')
        const item = ref({})
        const modal = ref(null)
        const toast = ref(null)
        const myCanvas = ref(null)
        const testModal = ref(null)
        const qty = ref(0)
        const state = reactive({
            date: '',
        })

        const handleQtyInput = computed(() => {
            return Number(qty.value).toLocaleString()
        })

        const formattedQty = computed(() => {
            return Number(qty.value.toString().replace(/\D/g, ''))
        })

        function handleQty(qty) {
            Number(qty).toLocaleString()
            // console.log(handleQtyInput)
        }

        async function fetchUsers() {
            await API_Service.getUsers()
                .then(res => (users.value = res.data))
                .catch(err => err)
        }

        function addUser(index) {
            user.value = users.value[index]
            // console.log(user.value)
            this.checKon(user.value.id)

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
            localStorage.setItem('admins', JSON.stringify(admins.value))
            // console.log(admins.value)
        }

        function userItem(user) {
            item.value = user
        }

        function checKon(id) {
            users.value.forEach(item => {
                if (item.id === id) {
                    console.log('hooriaaaa!!!')
                }
            })
        }

        function toTest() {
            console.log()
        }

        return {
            user,
            users,
            fetchUsers,
            admins,
            addUser,
            date,
            userItem,
            item,
            modal,
            toast,
            myCanvas,
            qty,
            formattedQty,
            handleQtyInput,
            checKon,
            toTest,
            testModal,
            state,
        }
    },
    provide: ['admins'],
    created() {
        this.fetchUsers()
        if (localStorage.admins) this.admins = JSON.parse(localStorage.admins)
    },

    mounted() {
        this.modal = new Modal(this.$refs.reference, {
            backdrop: 'static',
            keyboard: false,
        })
        // this.testModal = new Modal(this.$refs.testmodal)

        // console.log(this.modal)
        this.toast = new Toast(this.$refs.target, { delay: 4000 })
        this.myCanvas = new Offcanvas(this.$refs.mycanvas)
    },
}
</script> -->
