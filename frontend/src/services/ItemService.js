// import HttpService from './HttpService'
// const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/item' : '//localhost:3000/api/item'


export default {
    query
}

async function query(){
    try {// const items = await HttpService.get(BASE_URL);
    const items = await require('../../../db/item.json')
    // if (items && items.length) return items
    // console.log('query items:', items);
    return items
    } catch(error){
        console.error('couldnt get items');
    }
}
