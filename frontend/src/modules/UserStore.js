import UserService from "../services/UserService";

export default {
    state: {
        currUser: null,
        loggedInUser: null,

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
        setLoggedInUser(state, {user}){
            if (!user) state.loggedInUser = null;
            else {
                state.loggedInUser = user;
                state.loggedInUserWishListItems = user.itemsOnWishList;
            }
        }
    },
    actions: {
        async signIn(context, {userCred}) {
            const user = await UserService.signIn(userCred);
            context.commit({type: 'setLoggedInUser', user})
            return user;
        },
        async signUp(context, {userCred}) {
            const user = await UserService.signUp(userCred)
            context.commit({type: 'setLoggedInUser', user})
            return user;
        },
        async logout(context) {
            await UserService.logout()
            context.commit({type: 'setLoggedInUser'})
        },
        async loadUser(context, { userId }){
            const user = await UserService.getById(userId)
            context.commit({ type: 'setUser', user })
        },
        async loadLoggedInUser(context){
            const user = await UserService.checkIsLoggedInUser()
            if (user) context.commit({type: 'setLoggedInUser', user})
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {user}) {
            const updatedUser = await UserService.update(user);
            context.commit({type: 'setUser', user: updatedUser})
            return updatedUser
        },
        // async addToWishList(context, itemId) {
        //     if (this.state.loggedInUser._id) {
                // console.log('STORE ACTION itemsent is: ', this.state.loggedInUser._id)
                // console.log('STORE ACTION itemsent is: ', context, user, itemId)
                // const user = await UserService.getById(this.state.loggedInUser._id)
                // console.log('STORE ACTION user is: ', context, user, itemId)
            // }
            // else console.log(this.state.loggedInUser)
            // const item = state.items.find(item => item._id === itemId)
            // state.currUser.wishlistItems.unshift(item);
        // },
    },
    getters: {
        user(state) {
            return state.currUser;
        },
        wishListItems(state) {
            console.log("STORE GETTERS: ", state.currUser.wishListItems)
            // return state.loggedInUser.itemsOnWishList;
        }, 
        loggedInUser(state) {
            return state.loggedInUser
        },
    }
}
