<template>
    <div v-if="candids.length > 0" class="card">
        <div class="card-header">
            &#129351; کاندیدای منتخب
        </div>
        <ul class="list-group list-group-flush">
            <li
                v-for="candid in candids"
                :key="candid.id"
                class="list-group-item"
            >
                <span class="badge bg-primary rounded-pill">{{
                    candid.count
                }}</span>
                {{ `[ ${candid.name} ]` }}
            </li>
        </ul>
    </div>
    <div v-else class="bg-light p-4">
        کاندید نداریم!!!
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'intest',
    computed: {
        ...mapState('products', ['candids']),
    },
}
</script>
