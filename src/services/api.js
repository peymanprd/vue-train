import axios from 'axios'

export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

export default {
    login(user) {
        return apiClient.post('/auth/login', user)
    },
    getProducts() {
        return apiClient.get('/products')
    },
}
