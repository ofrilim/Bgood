import ItemService from '../services/ItemService.js';

export default {
    state: {
        items: [],
        // status: 'available',
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
        async loadItems(context, filterBy) {
            var items = [];
            try {
                if (filterBy) {
                    items = await ItemService.query(filterBy);
                    console.log('store load items:', items);
                } else {
                    items = await ItemService.query();
                    context.commit({ type: 'setItems', items })
                }
                    return items
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
        lowestPriceItems(state){
            var itemsToSort = JSON.parse(JSON.stringify(state.items))
            var lowestPriceItems = itemsToSort.sort((a, b)=> {
                return a.price - b.price;
            })
            // lowestPriceItems = lowestPriceItems.slice(0, 4)
            return lowestPriceItems     
        },
        mostWishedItems(state){
            var itemsToSort = JSON.parse(JSON.stringify(state.items))
            var wishedItems = itemsToSort.sort((a, b)=> {
                return b.wishCount + a.wishCount;
            })
            // wishedItems = wishedItems.slice(0, 4)
            return wishedItems     
        },
        newestItems(state){
            var itemsToSort = JSON.parse(JSON.stringify(state.items))
            var newestItems = itemsToSort.sort((a, b)=> {
                return b.createdAt - a.createdAt;
            })
            // newestItems = newestItems.slice(0, 4)
            return newestItems     
        }
    }
}
