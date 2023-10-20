import axios from 'axios'

const token = typeof window !== "undefined" && window.localStorage.getItem('token')

export const API = axios.create({
    // baseURL: 'https://visitors-api.amalitech-dev.net/api/v1',
    baseURL: 'http://localhost:5010/api/v1',
    headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ''
    }
})