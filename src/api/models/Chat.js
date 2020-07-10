const { Schema, model, Mongoose } = require('mongoose');

const ChatSchema = new Schema({
    id_user: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    });

module.exports = model('Chat', ChatSchema);