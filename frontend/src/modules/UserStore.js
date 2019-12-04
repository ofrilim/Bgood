import UserService from "../services/UserService";

export default {
    state: {
        currUser: null,
        loggedInUser: null
    },
    mutations: {
        setUser(state, {user}){
            state.currUser = user
        },
        setUsers(state, {users}) {
            state.users = users;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        addToWishList(state, itemId) { // TODO - define with DIFF (Liron comment)
            const item = state.items.find(item => item._id === itemId)
            state.currUser.wishlistItems.unshift(item);
        },
        setLoggedInUser(state, {user}){
            if (user) state.loggedInUser = user;
            else state.loggedInUser = null;
            console.log('state logged in user:', state.loggedInUser);
        }
    },
    actions: {
        async signIn(context, {userCred}) {
            const user = await UserService.signIn(userCred);
            // console.log('store sign in user:', user);
            context.commit({type: 'setLoggedInUser', user})
            return user;
        },
        async signup(context, {userCred}) {
            const user = await UserService.signup(userCred)
            context.commit({type: 'setUser', user})
            return user;
        },
        async logout(context) {
            await UserService.logout()
            // context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setLoggedInUser'})
        },
        async loadUser(context, { userId }){
            const user = await UserService.getById(userId)
            context.commit({ type: 'setUser', user })
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {user}) {
            user = await UserService.update(user);
            context.commit({type: 'setUser', user})
        }
    },
    getters: {
        user(state) {
            return state.currUser;
        },
        wishListItems(state) {
            console.log("STORE GETTERS: ", state.currUser.wishListItems)
            return state.currUser.wishListItems;
        }, 
        loggedInUser(state) {
            return state.loggedInUser
        },
    }
}
