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
            const item = state.items.find((item) => item._id === itemId);
            state.currItem = item;
            // console.log('store item:', state.currItem);
        },
        setItem(state, {editedItem}){
            console.log('editedItem:', editedItem);
            
            const idx = state.items.findIndex(item => item._id === editedItem._id)
            if (idx === -1) state.items.unshift(editedItem)
            else state.items.splice(idx, 1, editedItem)
        },
        removeItem(state, {id}){
            const idx = state.items.findIndex(item => item._id === id)
            state.items.splice(idx, 1)
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
        },
        async loadItem(context, {itemId}){
            let item = await ItemService.getById(itemId)
            context.commit({type: 'setCurrItem', item})
        },
        async saveItem(context, {item}){
            const editedItem = await ItemService.update(item)
            context.commit({type: 'setItem', editedItem})
            return editedItem;
        },
        async removeItem(context, {itemId}){
            const id = await ItemService.remove(itemId)
            context.commit({type: 'removeItem', id})
            console.log('item deleted');
            console.log('items:', context.state.items);
            return id;
        }
    },
    getters: {
        items(state){
            return state.items
        },
        item(state){
            return state.currItem;
        },
    }
}
