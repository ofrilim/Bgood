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
        },
        setCurrItem(state, {itemId}){
            var item = state.items.find((item) => item._id === itemId);

            state.currItem = item;
            console.log('store item:', state.currItem);
        },
       
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
        },
        item(state){
            return state.currItem;
        }
    }
}