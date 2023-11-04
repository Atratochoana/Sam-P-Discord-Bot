const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name:'ban',
    description:'Bans a member.',
    devOnly: false,
    // testOnly: Bool,
    deleted: false,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name:'reason',
            description: 'The reason for banning',
            type:ApplicationCommandOptionType.String,
        }
    ],
    //permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client,interaction) => {
        const user = interaction.user
        interaction.reply('Enjoying ban town loser - Sam Paddy');
        interaction.member.timeout(5*60*1000).catch(console.error);
    },

};