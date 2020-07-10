const app = require('./app');
const chatController = require('./api/controllers/ChatController')

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = (process.env.PORT || '3333');
app.set('PORT', port);

io.on('connection', socket => {

        let messages;

        socket.on('chat_info', async info => {
                messages = await chatController.findMessages(info);
                socket.join(info.idUser);
                socket.emit('allMessages', messages);
        })

        socket.on('send', async data => {
                await chatController.handleData(data);
                socket.to(data.clientId).emit('message', data);
        })
})

server.listen(port, () =>
        console.log(`Server running on port ${app.get('PORT')}`))


module.exports = server;