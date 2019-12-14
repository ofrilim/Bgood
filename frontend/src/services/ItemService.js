import HttpService from './HttpService.js';

export default {
    query,
    getById,
    update,
    remove,
    add,
}

function query(filterBy) {
    var url = 'item';
    if (filterBy) {
        url += '?'
        if (filterBy.category) url += `category=${filterBy.category}&`
        if (filterBy.keywords) url += `keywords=${filterBy.keywords[0]}&`
        if (filterBy.price) url += `price=${filterBy.price}&`
    }
    console.log('url:', url);
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
    newItem.keywords = newItem.keywords.split(' ');
    newItem.wishCount = 0;
    newItem.createdAt = Date.now();
    newItem.status = 'available';
    return await HttpService.post(`item`, newItem)   
}

