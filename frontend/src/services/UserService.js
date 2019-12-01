import HttpService from './HttpService';

export default {
    query,
    update,
    getById,
    remove,
    add,

    // queryUsers
}
    
function query() {
    return HttpService.get('user')
}

function update(edited) {
    return HttpService.put(`user/${edited._id}`, edited)
}

function getById(id) {
    return HttpService.get(`user/${id}`)
}

function remove(id) {
    return HttpService.delete(`user/${id}`)
}

function add(added) {
    return HttpService.post(`user`, added)
}