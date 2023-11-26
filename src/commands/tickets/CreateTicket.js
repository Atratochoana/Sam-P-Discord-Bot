const { Client, Interaction, ApplicationCommandOptionType, ChannelType, EmbedBuilder} = require("discord.js");
const logInteraction = require("../../utils/logInteraction");

module.exports = {
    name: "create-ticket",
    description: "Creates a ticket",
    userPermissions: true,
    permissionLevel: 1,
    options: [
        {
            name: "ticket-name",
            description: "Name of the ticket",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "description",
            description: "Description for the reason of the ticket",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client,interaction) => {
        logInteraction(interaction)

        const guildCategoryId =  "1172226325210222632" // This is where i need to add functionality to check for if one exist | should be done through database

        const liveTicketChannelId = "1172226715142066238" // This also needs to be tracked from when disord bot creates one or manually set it | stored in database again

        const liveTicketChannel = await interaction.guild.channels.fetch(liveTicketChannelId)

        const embed = new EmbedBuilder()
            .setColor('#0fdbc0')
            .setDescription(`Hello <@${interaction.user.id}>,
            Bla Bla Bla`)

        liveTicketChannel.threads.create({
                name: `misc-${interaction.user.username}`,
                autoArchiveDuration: 1440,
                reason: 'Needed a separate thread for food',
                type: ChannelType.PrivateThread,
                invitable: false
            }).then(threadChannel => {
                // threadChannel.members.add("527164962515189770")
                // threadChannel.members.add(interaction.user.id)
                threadChannel
                threadChannel.send({embeds: [embed]})
            })



    },



}