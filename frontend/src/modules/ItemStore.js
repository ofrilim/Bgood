import ItemService from '../services/ItemService.js';
// import UserStore from './UserStore.js';
// import router from '../router/index';

export default {
    state: {
        items: [],
        currItem: null,
        filterBy: {

        }
    },
    mutations: {
        setItems(state, {items}){
            state.items = items;
            // console.log('set items:', state.items);
        },
        setCurrItem(state, {itemId}){
            var item = state.items.find((item) => item._id === itemId);
            state.currItem = item;
            // console.log('store item:', state.currItem);
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
        },
    },
    getters: {
        items(state){
            // console.log('store items:', state.items);
            return state.items
        },
        item(state){
            return state.currItem;
        },
        // userItems(state){
        //     const currUser = UserStore.getters.user
        //     const itemsCopy = [...state.items]
        //     const filteresItems = itemsCopy.filter(item => item.owner._id === currUser._id)
        //     return filteresItems
        // }
    }
}