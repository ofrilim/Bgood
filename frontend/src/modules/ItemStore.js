import ItemService from '../services/ItemService.js';
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
        },
        setCurrItem(state, { itemId }){
            const item = state.items.find(item => item._id === itemId)
            state.currItem = item;
        },
        setItem(state, {editedItem}){
            const idx = state.items.findIndex(item => item._id === editedItem._id)
            if (idx === -1) state.items.unshift(editedItem)
            else state.items.splice(idx, 1, editedItem)
        },
        removeItem(state, {itemId}){
            const idx = state.items.findIndex(item => item._id === itemId)
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
        async saveItem(context, { item, user }){
            let editedItem = null;
            if (item._id) editedItem = await ItemService.update(item)
            else editedItem = await ItemService.add(item, user)             
            context.commit({type: 'setItem', editedItem})
            return editedItem;
        },
        async removeItem(context, {itemId}){
            await ItemService.remove(itemId)
            context.commit({type: 'removeItem', itemId})
            return {};
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
