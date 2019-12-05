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
            console.log('STATE MUTATION logged in user:', state.loggedInUser);
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
            console.log('store user:', user);
            context.commit({ type: 'setUser', user })
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {user}) {
            user = await UserService.update(user);
            context.commit({type: 'setUser', user})
        },
        async addToWishList(context, itemId) {
            if (this.state.loggedInUser._id) {
                console.log('STORE ACTION itemsent is: ', this.state.loggedInUser._id)
                console.log('STORE ACTION itemsent is: ', context, user, itemId)
                const user = await UserService.getById(this.state.loggedInUser._id)
                console.log('STORE ACTION user is: ', context, user, itemId)
            }
            else console.log(this.state.loggedInUser)
            // const item = state.items.find(item => item._id === itemId)
            // state.currUser.wishlistItems.unshift(item);
        },
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