import UserService from "../services/UserService";
import SessionService from "../services/SessionService";

export default {
    state: {
        wishList: [],       
        loggedInUser: null,
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
        setLoggedInUser(state, { user }) {
            if (!user) {
                state.loggedInUser = null;
            }
            else {
                state.loggedInUser = user;
                state.wishList = user.wishList
            }
        },
        updateUser(state, {user}) {    
            state.loggedInUser = user;
            state.wishList = user.wishList;
        }
    },
    actions: {
        async signIn(context, { userCred }) {
            const user = await UserService.signIn(userCred);
            context.commit({ type: 'setLoggedInUser', user })
            return user;
        },
        async signUp(context, { userCred }) {
            const user = await UserService.signUp(userCred)
            context.commit({ type: 'setLoggedInUser', user })
            return user;
        },
        async logOut(context) {
            await UserService.logOut()
            context.commit({ type: 'setLoggedInUser' })
        },
        async loadLoggedInUser(context) {
            const userFromSession = await SessionService.checkIsLoggedInUser()
            if (!userFromSession) {
                context.commit({ type: 'setLoggedInUser', user: null });
                return;
            }
            const user = await UserService.getById(userFromSession._id)
            context.commit({ type: 'setLoggedInUser', user })
        },
        async setOnWishList(context, { item }) { 
            try {
                let diff;
                const user = JSON.parse(JSON.stringify(context.state.loggedInUser)) 
                if (user.wishList.includes(item._id)) {
                    const idx = user.wishList.findIndex(itemId => itemId === item._id)
                    user.wishList.splice(idx, 1)
                    diff = -1
                } else {
                    user.wishList.unshift(item._id)
                    diff = 1
                }
                var payload = {item, diff}
                await context.dispatch('setWishCount', payload)
                const updatedUser = await UserService.update(user)
                context.commit({type: 'updateUser', user: updatedUser})
                }
            catch (error) {
                console.error('ERROR: USERSTORE ADDTOWISHLIST ACTION', error)
            }
         },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        wishList(state) {
            return state.wishList;
        }
    }
}
