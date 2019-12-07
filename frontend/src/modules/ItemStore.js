import ItemService from '../services/ItemService.js';

export default {
    state: {
        items: [],
        status: 'available',
        filterBy: {}
    },
    mutations: {
        setItems(state, { items }) {
            state.items = items;
        },
        setItem(state, { editedItem }) {
            const idx = state.items.findIndex(item => item._id === editedItem._id)
            if (idx === -1) state.items.unshift(editedItem)
            else state.items.splice(idx, 1, editedItem)
        },
        removeItem(state, { itemId }) {
            const idx = state.items.findIndex(item => item._id === itemId)
            state.items.splice(idx, 1)
        },
    },
    actions: {
        async loadItems(context) {
            try {
                const items = await ItemService.query();
                context.commit({ type: 'setItems', items })
            } catch (err) {
                console.error('ITEM STORE ERROR LOAD ITEMS', err);
            }
        },
        async saveItem(context, { item, userId }) {
            let editedItem = null;
            console.log('STORE item to save:', item);
            
            if (item._id) editedItem = await ItemService.update(item)
            else editedItem = await ItemService.add(item, userId)
            context.commit({ type: 'setItem', editedItem })
        },
        async buyItem(context, { item }) {
            const editedItem = await ItemService.update(item)
            context.commit({ type: 'setItem', editedItem })
            return {}
        },
        async removeItem(context, { itemId }) {
            await ItemService.remove(itemId)
            context.commit({ type: 'removeItem', itemId })
            return {};
        }
    },
    getters: {
        items(state) {
            return state.items
        },
    }
}
