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
        },
        updateUser(state, {user}){
            state.loggedInUser = user
            console.log('mutation updates user:', user);
            console.log('mutation updates logged in user:', state.loggedInUser);
            console.log('mutation updates user wishlist:', state.loggedInUser.wishList);
            console.log('mutation updates user wishlist items:', state.loggedInUser.wishListItems);
            
        }
    },
    actions: {
        async signIn(context, {userCred}) {
            const user = await UserService.signIn(userCred);
            console.log('store logged in user:', user);
            // const fullUser = await UserService.getById(user._id);
            // console.log('store logged in fullUser:', fullUser);
            // context.commit({type: 'setLoggedInUser', fullUser})
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
            context.commit({type: 'updateUser', user: updatedUser})
            return updatedUser
        },
        async addToWishList(context, {itemId}) {
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
