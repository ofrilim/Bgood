// import HttpService from './HttpService'
// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/item' : '//localhost:3000/api/item'

import HttpService from './HttpService.js';

export default {
    query,
    // saveItem,
    getById,
    update,
    remove,
    add,
    uploadImg
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
    console.log('remove service id:', id);
    
    return HttpService.delete(`item/${id}`)
}

function add(newItem, {_id, fullname, imgUrl }) {
    newItem._id = _makeId();
    newItem.wishCount = 0;
    newItem.createdAt = Date.now();
    newItem.status = 'available';
    newItem.owner = {_id, name: fullname, imgUrl};
    console.log('added new item:', newItem);
    return HttpService.post(`item`, newItem)   
}

function uploadImg(ev) {
    const CLOUD_NAME = 'dtkrff3dw'
    const PRESET_NAME = 'e3wgawo9'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    // const CLOUDINARY_URL = `cloudinary://479428615458491:63lsLFAP5ZnZ_esAOfc5Y6TnR70@dtkrff3dw`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res.url
        })
        .catch(err => console.error(err))
}


function _makeId(length=4) {
    var txt = '3';
    var possible = '0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
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
