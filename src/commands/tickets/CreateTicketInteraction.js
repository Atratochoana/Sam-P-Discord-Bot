const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder} = require("discord.js");
const ServerSettings =  require("../../models/ServerSettings");

module.exports = {
    name: "create-ticket-interaction",
    description: "Creates a ticket interaction",
    userPermissions: true,
    permissionLevel: 3,
    deleted: false,
    options: [
        {
            name: "channel",
            description: "Channel where buttons will go",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "live-channel",
            description: "Where the live channels will go",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "log-channel",
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
        
    callback: async (client,interaction) => {
        try {
            channel = interaction.options.getChannel('channel')
            LiveChannel = interaction.options.getChannel('live-channel')
            LogChannel = interaction.options.getChannel('log-channel')
            if (await ServerSettings.findOne({guildId: interaction.guildId}) != null) {
                await ServerSettings.updateOne(
                    {
                        guildId: interaction.guildId,
                        liveChannel: LiveChannel.id,
                        logChannel: LogChannel.id,
                    },
                );
            }
            else {
                await ServerSettings({
                    guildId: interaction.guildId,
                    liveChannel: LiveChannel,
                    logChannel: LogChannel,
                }).save()
            }

            testChannel = await ServerSettings.findOne({guildId: interaction.guildId})
            console.log(testChannel["liveChannel"])
                


            
            interaction.reply({
                content: `Done!`,
                ephemeral: true,
            })
        } 
        catch (error) {
            interaction.reply({
                content:`An error has occrured while creating the Ticket interaction board - [${error}]`,
                emphemeral: true,
            })
        }
            
        
    },
    
}
