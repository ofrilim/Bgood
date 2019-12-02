import ItemService from '../services/ItemService.js';
// import UserStore from './UserStore.js';
// import router from '../router/index';

export default {
    state: {
        items: [],
        currItem: null,
        msg: '',
        status: 'Available',
        filterBy: {

        }
    },
    mutations: {
        setItems(state, {items}){
            state.items = items;
            // console.log('set items:', state.items);
        },
        setCurrItem(state, {item}){
            // const item = state.items.find((item) => item._id === itemId);
            state.currItem = item;
            // console.log('store item:', state.currItem);
        },
        setItem(state, {editedItem}){
            console.log('editedItem:', editedItem);
            const idx = state.items.findIndex(item => item._id === editedItem._id)
            if (idx === -1) state.items.unshift(editedItem)
            else state.items.splice(idx, 1, editedItem)
        },
        addToWishList(state, itemId) { // TODO - define with DIFF (Liron comment)
            const item = state.items.find(item => item._id === itemId)
            state.currUser.wishlistItems.unshift(item);
        },
        setMsg(state, {msg}) {
            state.msg = msg;
        },
        
        // saveBuyStatus(state, {item}) {
        //     // this.status.commit({type: 'buyItem', item})
        //     const item = state.items.find((item) => item._id === itemId);
        //     state.currItem.status = "in process";
        // },
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
            console.log('item:', item);
            
            // var item = {...savedItem};
            const editedItem = await ItemService.update(item)
            console.log('editedItem:', editedItem);
            context.commit({type: 'setItem', editedItem})
            return editedItem;
        },
        setMsg(context, {msg}) {
            context.commit({type: 'setMsg', msg});
            setTimeout(()=>context.commit({type: 'setMsg', msg: null}), 2500);
        },
        async buyItem(context, {editedItem}){
            const status = await ItemService.update(status)
            context.commit({type: 'setItem', status})
            console.log("item actionStore/actions: ", editedItem)
            return newStatus
        },
    },
    getters: {
        items(state){
            return state.items
        },
        item(state){
            return state.currItem;
        },


        // wishlistItemsCount(state) {
        //     // console.log("wishList: ", state.currUser.wishlistItems)
        //     return state.currUser.wishlistItems.length;
        // },
        // wishedItemsList(state) {
        //     // console.log("wishList-userStore: ", state.currUser.wishlistItems.length)
        //     return state.currUser.wishlistItems;
        // }
    }
}
