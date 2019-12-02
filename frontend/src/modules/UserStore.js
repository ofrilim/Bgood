import UserService from "../services/UserService";

// import UserService from '../services/UserService.js';

export default {
    state: {
        currUser: null,
    },
    mutations: {
        setUser(state, {user}){
            state.currUser = user
        },
        addToWishList(state, itemId) { // TODO - define with DIFF (Liron comment)
            const item = state.items.find(item => item._id === itemId)
            state.currUser.wishlistItems.unshift(item);
        }
    },
    actions: {
        async loadUser(context, {userId}){
            const user = await UserService.getById(userId)
            context.commit({type: 'setUser', user})
        },
    },
    getters: {
        user(state){
            return state.currUser;
        },
        wishlistItemsCount(state) {
            if (!state.currUser) return '0'
            // console.log("wishList: ", state.currUser.wishlistItems)
            return state.currUser.wishlistItems.length;
        },
        
        wishedItemsList(state) {
            // console.log("wishList-userStore: ", state.currUser.wishlistItems.length)
            return state.currUser.wishlistItems;
        }
    }
}