const {Client,Interaction ,ApplicationCommandOptionType} = require('discord.js');
const logInteraction = require("../../utils/logInteraction");

module.exports = {
    name:'sam',
    description:'What sam says to certain people',
    devOnly: false,
    //testOnly: Boolean,
    //options: Object[],
    deleted: false,
    options: [
        {
            name: 'target-user',
            description: 'who sam attacks',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        }
    ],


    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client,interaction) => {
        logInteraction(interaction)
        guildMember = interaction.Member
        member = interaction.user

        interaction.reply(`<@${interaction.options.get('target-user').value}> is a stinky nig- oh sorry i meant fag. :angry: `)
    },
};