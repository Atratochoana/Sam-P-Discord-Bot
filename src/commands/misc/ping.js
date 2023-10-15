module.exports = {
    name:'ping',
    description:'Pong!',
    devOnly: false,
    // testOnly: Boolean,
    //options: Object[],
    // deleted: Boolean,

    callback: (client,interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
};