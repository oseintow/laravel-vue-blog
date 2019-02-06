import axios from 'axios';
import store from '@/store/'

export default function setup() {
    axios.interceptors.request.use(function(config) {
        const token = store.getters.getToken;
        if(token) {
            config.headers.BadIt = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}