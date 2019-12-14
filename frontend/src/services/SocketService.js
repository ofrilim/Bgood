import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000'
var socket;

export default {
    setup,
    on,
    off,
    emit
    // terminate,
}

function setup() {
    socket = io(BASE_URL);
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function off(eventName, cb) {
    socket.off(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}

// function terminate() {
//     socket = null;
// }
