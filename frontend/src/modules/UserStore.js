import UserService from "../services/UserService";

// import UserService from '../services/UserService.js';

export default {
    state: {
        currUser: 
        {
            _id: "2385",
            fullname: "Luping",
            username: "MCory",
            password: "hJTUg",
            email: "CMuroski@nec.com",
            imgUrl : "`https://api.adorable.io/avatars/100/Luping@adorable.png`",
            isAdmin : false,
            location: {
                adress: "kjhkag",
                lat: 0,
                lng: 0    },
            wishlistItems : [
                {
                    _id: "2505",
                    name: "ipsum vitae",
                    imgUrl: ""    },
                {
                    _id: "2510",
                    name: "aliquam ipsum",
                    imgUrl: ""    }        
                ]
            }, 
    },
    mutations: {
        setUser(state, {user}){
            console.log('store user:', user);
            state.currUser = user
        },
        addToWishList(state, itemId) { // TOTO - define with DIFF (Liron comment)
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
            console.log("wishList: ", state.currUser.wishlistItems)
            return state.currUser.wishlistItems.length;
        },
        
        wishedItemsList(state) {
            console.log("wishList-userStore: ", state.currUser.wishlistItems.length)
            return state.currUser.wishlistItems;
        }
    }
}