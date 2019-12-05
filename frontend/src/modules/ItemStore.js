import ItemService from '../services/ItemService.js';

export default {
    state: {
        items: [],
        currItem: null,
        msg: null,
        status: 'Available',
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
        },
        setMsg(state, {msg}){
            state.msg = msg;
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
            let editedItem = item;
            if (item._id) editedItem = await ItemService.update(item)
            else editedItem = await ItemService.add(item, user._id)             
            context.commit({type: 'setItem', editedItem})
            return editedItem;
        },
        setMsg(context, {msg}) {
            context.commit({type: 'setMsg', msg});
            setTimeout(()=>context.commit({type: 'setMsg', msg: null}), 2500);
        },
        async buyItem(context, {item}){
            const editedItem = await ItemService.update(item)
            context.commit({type: 'setItem', editedItem})
            return {}
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
        msg(state){
            return state.msg
        }
    }
}
