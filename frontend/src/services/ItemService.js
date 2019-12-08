import HttpService from './HttpService.js';

export default {
    query,
    getById,
    update,
    remove,
    add,
}

// .limit(3).sort( { name: 1, born: -1 } )
function query(filter) {
    var url = 'item';
    if (filter.filterBy) url += `?limit=3&sort=${filter.filterBy}`
    return HttpService.get(url)
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

