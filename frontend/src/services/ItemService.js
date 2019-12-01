// import HttpService from './HttpService'
// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/item' : '//localhost:3000/api/item'

import HttpService from './HttpService.js';

export default {
    query,
    // saveItem,
    getById,
    update,
    remove,
    add
}


function query() {
    return HttpService.get('item')
}

function update(edited) {
    return HttpService.put(`item/${edited._id}`, edited)
}

function getById(id) {
    return HttpService.get(`item/${id}`)
}

function remove(id) {
    return HttpService.delete(`item/${id}`)
}

function add(added) {
    return HttpService.post(`item`, added)
}

// async function query(){
//     try {// const items = await HttpService.get(BASE_URL);
//     const items = await require('../../../db/item.json')
//     // if (items && items.length) return items
//     return items
//     } catch(error){
//         console.error('couldnt get items');
//     }
// }

// async function update(newItem){
//     const copy = JSON.parse(JSON.stringify(newItem)) 
//     try {        
//         const items = await require('../../../db/item.json')
//         const idx = items.findIndex(item => item._id === copy._id)
//         // console.log('service newItem:', copy);
//         if (idx === -1) items.unshift(copy)
//         else items.splice(idx, 1, copy)
//         // _savetoysToFile(items)
//         return copy
//     } 
//     catch (err) {
//         console.error('Couldn\'t save item, try again');
//     }
// }

// async function getById(itemId){
//     const items = await require('../../../db/item.json')
//     const item = items.find(item => item._id === itemId)
//     return item
// }


// function _savetoysToFile(items) {
//     // fs.writeFileSync('data/item.json', JSON.stringify(items, null, 2));
// }
