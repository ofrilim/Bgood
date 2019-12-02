import HttpService from './HttpService';

export default {
    query,
    update,
    getById,
    remove,
    add,
    queryUsers
}
    
function query() {
    return HttpService.get('user')
}

function update(edited) {
    return HttpService.put(`user/${edited._id}`, edited)
}

// function getById(id) {
//     return HttpService.get(`user/${id}`)
// }

function remove(id) {
    return HttpService.delete(`user/${id}`)
}

async function getById(id) {
    try {
        const user = await HttpService.get(`user/${id}`);
        // const user = users.find((user) => user._id === id)
        // console.log('query users:', users);
        console.log('inside userService -> query user:', user);
        return user
        } catch(error){
            console.error('inside userService -> couldnt get users');
    }
}

function add(added) {
    return HttpService.post(`user`, added)
}
//     try {// const users = await HttpService.get(BASE_URL);
//         const users = await require('../../../db/user.json')
//         const user = users.find((user) => user._id === id)
//         return user
//         } catch(error){
//             console.error('couldnt get users');
//     }
// }

async function queryUsers(){
    try {
        const users = await HttpService.get('user');
        console.log('inside userService, query users:', users);
        return users
    } catch(error){
        console.error('inside userService -> couldnt get users');
    }
}
