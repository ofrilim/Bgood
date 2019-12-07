
export default {
    clearSession,
    handleLogin,
    checkIsLoggedInUser
}


function clearSession() {
    sessionStorage.clear();
}

function handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function checkIsLoggedInUser(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) return
    return user
}
