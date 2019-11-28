import UserService from "../services/UserService";

// import UserService from '../services/UserService.js';

export default {
    state: {
        currUser: null, 
    },
    mutations: {
        setUser(state, {user}){
            console.log('store user:', user);
            state.currUser = user
        }
    },
    actions: {
        async loadUser(context, {userId}){
            const user = await UserService.getById(userId)
            context.commit({type: 'setUser', user})
        }
    },
    getters: {
        user(state){
            return state.currUser;
        }
    }
}