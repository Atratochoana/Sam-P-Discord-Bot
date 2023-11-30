const { Client, Interaction, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: 'create-webhook',
    description: "Creates a channel to log commands in this server",
    userPermissions: true,
    permissionLevel: 3,
    options: [{
            name: 'channel',
            description: 'what channel you want the webhook to log to',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: (client,interaction) => {
        channel = interaction.options.getChannel("channel")
        channel.createWebhook({
            name: "Sam-P Logging",
        }).then(webhook => webhook.send(`Created webhook by <@${interaction.user.id}>`))
        // add a funcntionality to add to DB with guild id and webhook id so it can be called.

        interaction.reply({
            content: 'Webhook has been made, Its not recommended to make multiple webhook\'s in the same channel',
            ephemeral: true
        })

    }
}