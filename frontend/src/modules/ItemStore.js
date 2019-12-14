import ItemService from '../services/ItemService.js';

export default {
    state: {
        items: [],
    },
    mutations: {
        setItems(state, { items }) {
            state.items = items;
        },
        setItem(state, { editedItem }) {
            const idx = state.items.findIndex(item => item._id === editedItem._id)
            if (idx !== -1) state.items.splice(idx, 1, editedItem)
            else state.items.unshift(editedItem)
        },
        removeItem(state, { itemId }) {
            const idx = state.items.findIndex(item => item._id === itemId)
            state.items.splice(idx, 1)
        },
    },
    actions: {
        async loadItems(context, {filterBy}) {
            try {
                if (!filterBy) {
                    filterBy.txt = ''
                }
                var items = [];
                    items = await ItemService.query(filterBy);
                    context.commit({ type: 'setItems', items })
                return items
            } catch (err) {
                console.error('ITEM STORE ERROR LOAD ITEMS', err);
            }
        },
        async saveItem(context, { item }) {
            let editedItem = {};
            if (item._id) editedItem = await ItemService.update(item)
            else editedItem = await ItemService.add(item)
            context.commit({ type: 'setItem', editedItem })
        },
        async removeItem(context, { itemId }) {
            await ItemService.remove(itemId)
            context.commit({ type: 'removeItem', itemId })
            return {};
        },
        setWishCount(context, {itemId, diff}){
            const item = context.state.items.find(item => item._id === itemId)
            var itemCopy = JSON.parse(JSON.stringify(item))
            itemCopy.wishCount += diff
            context.dispatch({type: 'saveItem', item: itemCopy})
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
            return lowestPriceItems     
        },
        mostWishedItems(state){
            var itemsToSort = JSON.parse(JSON.stringify(state.items))
            var wishedItems = itemsToSort.sort((a, b)=> {
                return b.wishCount - a.wishCount;
            })
            return wishedItems     
        },
        newestItems(state){
            var itemsToSort = JSON.parse(JSON.stringify(state.items))
            var newestItems = itemsToSort.sort((a, b)=> {
                return b.createdAt - a.createdAt;
            })
            return newestItems     
        }
    }
}
