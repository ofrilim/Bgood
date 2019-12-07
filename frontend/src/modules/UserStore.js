import UserService from "../services/UserService";
import SessionService from "../services/SessionService";

export default {
    state: {
        wishList: [],       // TODO: WISH LIST
        loggedInUser: null,
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users;
        },
        setLoggedInUser(state, { user }) {
            if (!user) {
                state.loggedInUser = null;
            }
            else {
                state.loggedInUser = user;
            }
        },
    },
    actions: {
        async signIn(context, { userCred }) {
            const user = await UserService.signIn(userCred);
            context.commit({ type: 'setLoggedInUser', user })
            return user;
        },
        async signUp(context, { userCred }) {
            const user = await UserService.signUp(userCred)
            context.commit({ type: 'setLoggedInUser', user })
            return user;
        },
        async logOut(context) {
            await UserService.logOut()
            context.commit({ type: 'setLoggedInUser' })
        },
        async loadLoggedInUser(context) {
            const user = await SessionService.checkIsLoggedInUser()
            context.commit({ type: 'setLoggedInUser', user })
        },
        addToWishList(context, { itemId }) {    //  TODO:  STEPS FOR WISHlIST
            console.log("ADD TO WISH LIST ",itemId);
        }

    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        wishList(state) {           // TODO: WISH LIST
            return state.wishList;
        }
    }
}
