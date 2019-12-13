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
        async addToWishList(context, itemId) {    
           try {
               const user = JSON.parse(JSON.stringify(context.state.loggedInUser)) 
               if (user.wishList.includes(itemId)) return;
               user.wishList.unshift(itemId)
               const updatedUser = await UserService.update(user)
               context.commit({type: 'updateUser', user: updatedUser})
           }
           catch (error) {
               console.error('ERROR: USERSTORE ADDTOWISHLIST ACTION', error)
           }
        },
        async removeFromWishList(context, { itemId }) {
            try {
                let user = JSON.parse(JSON.stringify(context.state.loggedInUser)) 
                const idx = user.wishList.findIndex(item => itemId === item)
                user.wishList.splice(idx, 1)
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
