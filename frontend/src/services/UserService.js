import HttpService from './HttpService';

export default {
    getById,
    queryUsers
}

async function getById(id) {
    try {
        const users = await HttpService.get(BASE_URL);
        const user = users.find((user) => user._id === id)
        // console.log('query users:', users);
        console.log('inside userService -> query user:', user);
        return user
        } catch(error){
            console.error('inside userService -> couldnt get users');
    }
}

async function queryUsers(){
    try {
        const users = await HttpService.get(BASE_URL);
        console.log('inside userService, query users:', users);
        return users
    } catch(error){
        console.error('inside userService -> couldnt get users');
    }
}