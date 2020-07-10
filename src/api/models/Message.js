const { Schema, model, Mongoose } = require('mongoose');

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    chat_id: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    });

module.exports = model('Message', MessageSchema);