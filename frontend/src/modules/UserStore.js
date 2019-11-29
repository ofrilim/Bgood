import UserService from "../services/UserService";

// import UserService from '../services/UserService.js';

export default {
    state: {
        currUser: 
        {
            _id: "2385",
            fullname: "Marilyn-Monroe",
            username: "norma",
            password: "jean",
            email: "CMuroski@nec.com",
            imgUrl : "`http://cafe.themarker.com/media/t/984/737/file_0_big.jpg?1278782797`",
            isAdmin : false,
            location: {
                adress: "Los Angeles",
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
            console.log("wishList: ", state.currUser.wishlistItems)
            return state.currUser.wishlistItems.length;
        },
        
        wishedItemsList(state) {
            console.log("wishList-userStore: ", state.currUser.wishlistItems.length)
            return state.currUser.wishlistItems;
        }
    }
}