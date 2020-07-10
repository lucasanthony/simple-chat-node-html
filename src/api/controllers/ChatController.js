const User = require('../models/User');
const Message = require('../models/Message');
const Chat = require('../models/Chat');

module.exports = {
    async handleData(data) {
        const { clientId, name, content } = data;

        let chat = await Chat.findOne({ "id_user": clientId })
        if (!chat) {
            chat = await Chat.create({
                id_user: clientId
            });
        }

        await Message.create({ name: name, content: content, chat_id: chat._id });
    },

    async findMessages(chat_info) {
        const chat = await Chat.findOne({ id_user: chat_info.idUser })
        const messages = await Message.find({ chat_id: chat._id });
        return messages;
    }
}