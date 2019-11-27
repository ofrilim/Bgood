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
            try {
                const items = await ItemService.query();
                context.state.items = items;
                console.log('store items:', context.state.items);
            } catch(err) {
                console.error(err);
                
            }
        }
    },
    getters: {
        items(state){
            return state.items;
        }
    }
}