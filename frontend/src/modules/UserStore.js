import UserService from "../services/UserService";
// import UserService from '../services/UserService.js';

// var localLoggedinUser = null; // loggedinUser
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        users: [],
        loggedinUser: 
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
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, {user}){
            state.loggedinUser = user
        },
        addToWishList(state, itemId) { // TODO - define with DIFF (Liron comment)
            const item = state.items.find(item => item._id === itemId)
            state.loggedinUser.wishlistItems.unshift(item);
        }
    },
    actions: {
        async loadUser(context, {userId}){
            const user = await UserService.getById(userId)
            context.commit({type: 'setUser', user})
        },

        async login(context, {userId}) {
            const user = await UserService.login(userId);
            context.commit({type: 'setUser', user})
            return user;
        },
        async signup(context, {userId}) {
            const user = await UserService.signup(userId)
            context.commit({type: 'setUser', user})
            return user;
        },
        async logout(context) {
            await UserService.logout()
            context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setUser', user: null})
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async updateUser(context, {userId}) {
            user = await UserService.update(userId);
            context.commit({type: 'setUser', user})
        }
    },
    getters: {
        user(state){
            return state.loggedinUser;
        },
        wishlistItemsCount(state) {
            console.log("wishList: ", state.loggedinUser.wishlistItems)
            return state.loggedinUser.wishlistItems.length;
        },
        
        wishedItemsList(state) {
            console.log("wishList-userStore: ", state.loggedinUser.wishlistItems.length)
            return state.loggedinUser.wishlistItems;
        }
    }
}