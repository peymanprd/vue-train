import axios from 'axios'
// import { createClient } from '@supabase/supabase-js'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/peymanprd/API_db',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default {
    getUsers() {
        return apiClient.get('/users')
    },
}
