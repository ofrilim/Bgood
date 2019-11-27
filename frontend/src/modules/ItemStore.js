import ItemService from '../services/ItemService.js';
// import router from '../router/index';

export default {
    state: {
        items: [],
        currItem: null,
    },
    mutations: {
        setItems(state, {items}){
            state.items = items;
            console.log('store items:', state.items);
        }
    },
    actions: {
        async loadItems(context){
            try {
                const items = await ItemService.query();
                context.commit({type: 'setItems', items})
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