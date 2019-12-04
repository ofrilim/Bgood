import UserService from "../services/UserService";

export default {
    state: {
        currUser: null,
        // loggedInUser: null,
    },
    mutations: {
        setUser(state, { user }){
            state.currUser = user
        },
        addToWishList(state, itemId) { // TODO - define with DIFF (Liron comment)
            const item = state.items.find(item => item._id === itemId)
            state.currUser.wishlistItems.unshift(item);
        }
    },
    actions: {
        async loadUser(context, { userId }){
            const user = await UserService.getById(userId)
            console.log('store user:', user);
            context.commit({ type: 'setUser', user })
            
        },
    },
    getters: {
        user(state){
            return state.currUser;
        },        
        wishedItemsList(state) {
            // console.log("wishList-userStore: ", state.currUser.wishlistItems.length)
            return state.currUser.wishlistItems;
        }
    }
}
