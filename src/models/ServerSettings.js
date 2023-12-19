const { Schema, model} = require('mongoose');

const settingsSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    liveChannel: {
        type: String,
    },
    logChannel: {
        type: String,
    }
})

module.exports = model('settings', settingsSchema);