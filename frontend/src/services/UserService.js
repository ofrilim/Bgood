import HttpService from './HttpService';

export default {
    getById,
    // queryUsers
}

async function getById(id) {
    try {const users = await HttpService.get(BASE_URL);
        // const users = await require('../../../db/user.json')
        const user = users.find((user) => user._id === id)
        // console.log('query users:', users);
        // console.log('query user:', user);
        return user
        } catch(error){
            console.error('couldnt get users');
    }
}

// async function queryUsers(){
//     try {const users = await HttpService.get(BASE_URL);
//     // const users = await require('../../../db/user.json')
//     console.log('query users:', users);
//     return users
//     } catch(error){
//         console.error('couldnt get users');
// }
// }