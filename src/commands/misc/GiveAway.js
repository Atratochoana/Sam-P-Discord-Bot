const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const GiveAway = require("../../models/GiveAway")


module.exports = {
    name: 'giveaway',
    description: 'something',
    userPermissions: true,
    permissionLevel: 3,
    options: [
        {
            name: 'name',
            description: 'What your giveaway is called/about.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'description',
            description: 'Description of the giveaway',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'amount-of-winners',
            description: 'The amount of winners that you would like to have',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'giveaway-duration',
            description: 'How long you want the giveaway to last',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client,interaction) => {

        timeStamp = Math.floor(Date.now() /1000) + interaction.options.getInteger('giveaway-duration')


        const embed = new EmbedBuilder()
            .setTitle(interaction.options.getString('name'))
            .setDescription(`${interaction.options.getString('description')}
            Winners: [${interaction.options.getInteger('amount-of-winners')}]
            Ends <t:${timeStamp}:R>`)
            .setColor('#0fdbc0')

        button = new ButtonBuilder()
            .setEmoji("682294920387625039")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('join-giveaway')

        const row = new ActionRowBuilder()
        row.components.push(button)

        let messageId;

        await interaction.channel.send({
            embeds: [embed],
            fetchreply: true,
            components: [row],
        }).then(message => {messageId = message.id})

        interaction.reply({
            content: `Giveaway for [${interaction.options.getString('name')}] has been made for ${interaction.options.getInteger('amount-of-winners')} winners, that lasts [${interaction.options.getInteger('giveaway-duration')}] seconds.`,
            ephemeral: true
        })

        setTimeout(decideWinner,interaction.options.getInteger("giveaway-duration")*1000,interaction,messageId)
    }
}

async function decideWinner(interaction,messageId) {

    let users = await GiveAway.find({
        MessageId: messageId
    })

    const random = Math.floor(Math.random() * users.length);

    if (users.length === 0) {interaction.channel.send(`Nobody entered the giveaway :(`); return}

    interaction.channel.send(`Winner is <@${users[random]["UserId"]}>`)

    setTimeout(async () => {await GiveAway.deleteMany({MessageId: messageId})},5000) // deletes from data base after 5 seconds

}
