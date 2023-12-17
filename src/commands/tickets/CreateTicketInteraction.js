const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder} = require("discord.js");

module.exports = {
    name: "create-ticket-interaction",
    description: "Creates a ticket interaction",
    userPermissions: true,
    permissionLevel: 3,
    options: [
        {
            name: "Channel",
            description: "Channel where buttons will go",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "Live-Channel",
            description: "Where the live channels will go",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "Log-Channel",
            description: "Where tickets will log to",
            type: ApplicationCommandOptionType.Channel,
            require: true,
        }
    ],

        /**
         * 
         * @param {Client} client 
         * @param {Interaction} interaction 
         */
        
    callback: (client,interaction) => {


        
    },
    
}
