import HttpService from './HttpService.js';

export default {
    query,
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
    var item = HttpService.get(`item/${id}`)
    item.createdAt = convert(`/Date(${+item.createdAt})/`)
    console.log(item.createdAt)
    return item;
}

async function remove(id) {
    await HttpService.delete(`item/${id}`)
    return {}
}

// async function add(newItem, {_id, fullName, imgUrl }) {
async function add(newItem, _id) {
    newItem.wishCount = 0;
    newItem.createdAt = Date.now();
    newItem.status = 'available';
    newItem.ownerId = _id
    // newItem.owner = {_id, name: fullName, imgUrl};
    return await HttpService.post(`item`, newItem)   
}


/// SHOULD MOVE TO UTILLS!

function convert(timestamp) {
    var date = new Date(                          
      parseInt(                                
        timestamp.split("(")[1]                   
      )
    );
    return [
      ("0" + date.getDate()).slice(-2),           
      ("0" + (date.getMonth()+1)).slice(-2),     
      date.getFullYear()                         
    ].join('/');                             
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
            console.log('imgUrl:',res)
            return res.url
        })
        .catch(err => console.error(err))
}
