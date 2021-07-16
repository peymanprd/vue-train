import axios from 'axios'

export const apiClient = axios.create({
    baseURL: 'https://60ef02f6eb4c0a0017bf4720.mockapi.io/api/v1',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
})

export const userClient = axios.create({
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
        return userClient.post('/auth/login', user)
    },
    getProducts(page, limit) {
        return apiClient.get('/products', { params: { page, limit } })
    },
}
