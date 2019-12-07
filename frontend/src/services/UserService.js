import HttpService from './HttpService';

export default {
    query,
    update,
    getById,
    remove,
    add,
    signIn,
    logout,
    checkIsLoggedInUser,
    signUp
}
    


async function query() {
    try {
        const users = await HttpService.get('user')
        return users;
    } catch(error) {
        console.error('inside userService => couldnt get users');
    }
}

async function update(edited) {
    try {
        const user = await HttpService.put(`user/${edited._id}`, edited)
        console.log('service updated user:', user);
        
        return user;
    } catch(error) {
        console.error(`inside userService => couldnt update user: ${edited._id}`);
    }
}

async function getById(id) {
    try {
        const user = await HttpService.get(`user/${id}`);
        return user;
    } catch(error) {
        console.error(`inside userService -> couldnt getById user: ${id}`);
    }
}

async function remove(id) {
    try {
        await HttpService.delete(`user/${id}`)
        return {};
    } catch(error) {
        console.error(`inside userService -> couldnt remove user: ${id}`);
    }
}

async function add(added) {
    try {
        const user = await HttpService.post(`user`, added)
        return user;
    } catch(error) {
        console.error('inside userService -> couldnt add user');
    }
}

async function signIn(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signUp(userCred) {
    userCred.fullName = userCred.firstName + ' ' + userCred.lastName
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function checkIsLoggedInUser(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) return
    return user
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
