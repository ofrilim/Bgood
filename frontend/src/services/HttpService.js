import router from '@/router'
import Axios from 'axios';
// import store from '@/store'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000/'

var axios = Axios.create({
    withCredentials: true
})

export default {
    get(endpoint, data){
        // console.log('IN HTTPSERVICE GET FUNCTION',endpoint, data)
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;

    } catch (err) {
        if (err.response.status === 401) {
            router.push('/');
        }
    }
}

// import axios from 'axios'
// import router from '../router/index.js'

// function _handleError(err) {
//     console.log('Err:', err);
//     if (err.response.status === 401) {
//         sessionStorage.clear();
//         router.push('/');
//     }
//     throw err;
// }

// function get(url) {
//     return axios.get(url)
//         .then(res => res.data)
//         .catch(_handleError)
// }

// function remove(url) {
//     return axios.delete(url)
//         .catch(_handleError)
// }

// function post(url, data) {
//     return axios.post(url, data)
//         .then(res => res.data)
//         .catch(_handleError)
// }
// function put(url, data) {
//     return axios.put(url, data)
//         .then(res => res.data)
//         .catch(_handleError)
// }


// export const HttpService = {
//     get,
//     delete: remove,
//     post,
//     put
// } 