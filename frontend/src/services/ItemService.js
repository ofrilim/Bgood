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

function getById(id) {
    return HttpService.get(`item/${id}`)
}

function update(edited) {
    return HttpService.put(`item/${edited._id}`, edited)
}

function remove(id) {    
    return HttpService.delete(`item/${id}`)
}

function add(newItem) {
    newItem.wishCount = 0;
    newItem.createdAt = Date.now();
    newItem.status = 'available';
    // newItem.owner = {_id, name: fullName, imgUrl};
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
