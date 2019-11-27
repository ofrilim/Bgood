import ItemService from '../services/ItemService.js';
// import router from '../router/index';

export default {
    state: {
        items: [],
        currItem: null,
    },
    mutations: {
        
    },
    actions: {
        async loadItems(context){
            context.state.items = await ItemService.query()
            console.log('store items:', context.state.items);
        }
    },
    getters: {
        items(state){
            return state.items;
        }
    }
}