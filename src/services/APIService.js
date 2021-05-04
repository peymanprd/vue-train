import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/peymanprd/API_db',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default {
    getUsers(id) {
        return apiClient.get('/users', { params: { id: id } })
    },
    updateUser(id) {
        return apiClient.put('/users' + id)
    }
}
