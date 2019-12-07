import UserService from "../services/UserService";
import SessionService from "../services/SessionService";

export default {
    state: {
        wishList: [],       // TODO: WISH LIST
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
        updateUser(state, {user}){       // TODO: WISH LIST THING
            state.loggedInUser = user
            console.log('mutation updates user:', user);
            console.log('mutation updates logged in user:', state.loggedInUser);
            console.log('mutation updates user wishlist:', state.loggedInUser.wishList);
            console.log('mutation updates user wishlist items:', state.loggedInUser.wishListItems);
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
            const user = await SessionService.checkIsLoggedInUser()
            context.commit({ type: 'setLoggedInUser', user })
        },
        async updateUser(context, {user}) {         // TODO: WISH LIST
            const updatedUser = await UserService.update(user);
            context.commit({type: 'updateUser', user: updatedUser})
            return updatedUser;
        },
        async addToWishList(context, {itemId}) {        // TODO: WISH LIST
            if (context.state.loggedInUser) {
                const user = JSON.parse(JSON.stringify(context.state.loggedInUser)) 
                // console.log('STORE ACTION user is: ', user)
                // console.log('STORE ACTION item is: ', itemId)
                user.wishList.unshift(itemId)
                // console.log('STORE ACTION user is: ', user.wishList)
                const updatedUser = await UserService.update(user)
                // console.log('STORE ACTION user is: ', updatedUser)
                context.commit({type: 'updateUser', user: updatedUser})

            }
        },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        wishList(state) {           // TODO: WISH LIST
            return state.wishList;
        }
    }
}
