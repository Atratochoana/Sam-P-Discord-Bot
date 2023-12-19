const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType } = require("discord.js");
const ServerSettings = require("../../../models/ServerSettings");

module.exports = async (client, interaction) => {
    try {
        guild = interaction.guild
        channel = interaction.channel
        settings = (await ServerSettings.findOne({ guildId: guild.id }))
        const liveChannel = await guild.channels.fetch(settings["liveChannel"])
        const logChannel = await guild.channels.fetch(settings["logChannel"])


        const embed = new EmbedBuilder()
            .setColor('#0fdbc0')
            .setDescription(`Hello <@${interaction.user.id}>,
        Bla Bla Bla`)

        const supportRole = ""

        liveChannel.threads.create({
            name: `misc-${interaction.user.username}`,
            autoArchiveDuration: 1440,
            editable: false,
            reason: 'Needed a separate thread for food',
            type: ChannelType.PrivateThread,
            invitable: false
        }).then(threadChannel => {
            // threadChannel.members.add("527164962515189770")
            // threadChannel.members.add(interaction.user.id)
            threadChannel
            threadChannel.send({
                embeds: [embed],
                content: `<@${supportRole}><@${interaction.user.id}>`
            })
        })

    }
    catch (error) { interaction.reply({ content: `Oops something went wrong teehee - [${error}]` }) }





}