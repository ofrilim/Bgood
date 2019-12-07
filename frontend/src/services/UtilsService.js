
export default {
    timeStampToString,
    uploadImg
}

function timeStampToString(timestamp) {
    const timeStameString = `/Date(${timestamp})/`;
    var date = new Date(                          
      parseInt(                                
        timeStameString.split("(")[1]                   
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
            return res.url
        })
        .catch(err => console.error(err))
}
