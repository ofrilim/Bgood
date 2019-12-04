import UserService from "../services/UserService";

export default {
    state: {
        currUser: { "_id": "5de41bbe77a3f6bbaad48780",
                "fullName": "Goldia Yallop", 
                "firstName": "Goldia", 
                "lastName": "Yallop", 
                "email": "gyallop0@tripadvisor.com", 
                "password": "Y2Dv6q", 
                "imgUrl": "http://dummyimage.com/196x113.jpg/cc0000/ffffff", 
                "location": { "adress": "", "lat": 0, "lng": 0 }, 
                "wishListItems": [ 
                    { "_id": "5de3c54177a3f6bbaad48774", 
                    "name": "placerat sed", 
                    "price": 92, 
                    "imgUrl": "https://i.pinimg.com/236x/4e/4a/f4/4e4af4c40a7c33c49f71877f8ea33e55.jpg", 
                    "ownerName": "Rustin" 
                    },
                    { "_id": "5de3c54177a3f6bbaad48999", 
                    "name": "sed", 
                    "price": 192, 
                    "imgUrl": "https://i.pinimg.com/236x/4e/4a/f4/4e4af4c40a7c33c49f71877f8ea33e55.jpg", 
                    "ownerName": "Rustin" 
                }]},
        itemsInWishList: []
    },
    mutations: {
        setUser(state, { user }) {
            state.currUser = user
        },
        addToWishList(state, itemId) {
            console.log('STORE MUTATION', state, itemId)
            // const item = state.items.find(item => item._id === itemId)
            // state.currUser.wishlistItems.unshift(item);
        }
    },
    actions: {
        async loadUser(context, { userId }) {
            const user = await UserService.getById(userId)
            context.commit({ type: 'setUser', user })
        }
    },
    getters: {
        user(state) {
            return state.currUser;
        },
        wishListItems(state) {
            console.log("STORE GETTERS: ", state.currUser.wishListItems)
            return state.currUser.wishListItems;
        }
    }
}