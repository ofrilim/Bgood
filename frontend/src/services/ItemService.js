import HttpService from './HttpService.js';

export default {
    query,
    getById,
    update,
    remove,
    add,
}


function query() {
    return HttpService.get('item')
}

function update(edited) {    
    return HttpService.put(`item/${edited._id}`, edited)
}``

function getById(id) {
    var item = HttpService.get(`item/${id}`)
    return item;
}

async function remove(id) {
    await HttpService.delete(`item/${id}`)
    return {}
}

async function add(newItem) {
    newItem.wishCount = 0;
    newItem.createdAt = Date.now();
    newItem.status = 'available';
    // newItem.ownerId = userId;
    return await HttpService.post(`item`, newItem)   
}

