import HttpService from './HttpService';
import SessionService from './SessionService'

export default {
    query,
    update,
    getById,
    remove,
    add,
    signIn,
    logOut,
    signUp,
}


async function query() {
    try {
        const users = await HttpService.get('user')
        return users;
    } catch(error) {
        console.error('ERROR USERSERVICE => couldnt get users');
    }
}

async function update(edited) {
    try {
        const user = await HttpService.put(`user/${edited._id}`, edited)
        return user;
    } catch(error) {
        console.error(`ERROR USERSERVICE => couldnt update user: ${edited._id}`);
    }
}

async function getById(id) {
    try {
        const user = await HttpService.get(`user/${id}`);  // TODO:  THINK OF MAYBE ADD BOOLEAN FOR CLONE OPTION
        return user;
    } catch(error) {
        console.error(`ERROR USERSERVICE => couldnt getById user: ${id}`);
    }
}

async function remove(id) {
    try {
        await HttpService.delete(`user/${id}`)
        return {};
    } catch(error) {
        console.error(`ERROR USERSERVICE => couldnt remove user: ${id}`);
    }
}

async function add(added) {
    try {
        const user = await HttpService.post(`user`, added)
        return user;
    } catch(error) {
        console.error('ERROR USERSERVICE => couldnt add user');
    }
}

async function signIn(userCred) {
    let user;
    try {
        user = await HttpService.post('auth/login', userCred);
    } catch {
        user = null;
        console.error('ERROR USERSERVICE => couldnt find user');
    }
    return SessionService.handleLogin(user);
}

async function signUp(userCred) {
    userCred.cred.fullName = userCred.cred.firstName + ' ' + userCred.cred.lastName;
    userCred.cred.imgUrl = 'https://qph.fs.quoracdn.net/main-raw-359505805-hmqrogfhzagrxzngqieqxccqxpqxltrr.jpeg'
    userCred.cred.wishList = [];
    userCred.cred.location = { adress: '', lat: 0, lng: 0 }
    const user = await HttpService.post('auth/signup', userCred);
    return SessionService.handleLogin(user);
}

async function logOut() {
    await HttpService.post('auth/logout');
    SessionService.clearSession();
}
