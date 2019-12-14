import socket from '../services/SocketService'

export default {
    actions: {
        sendMsg(context, { msg }) {
            socket.emit('sendMsg', msg)
        }
    }, 
}