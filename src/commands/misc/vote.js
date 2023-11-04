const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, GuildMember } = require("discord.js");

module.exports = {
    name: "vote",
    description: "Creates a vote",
    //devOnly: false,
    deleted: false,
    options: [
        {
            name: "vote",
            description: "What your vote is called",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "description",
            description: "Descripton of the vote",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "ping",
            description: "Pings everyone",
            type: ApplicationCommandOptionType.Boolean,
        },
        {
            name: 'colour',
            description: 'Sets a colour on the sidebar of the embed. Has to be Hex value, otherwise wont work',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'author',
            description: 'If the author is to be displayed or not',
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => { 
        guildMember = interaction.member
        member = interaction.user

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.options.get('vote').value}`)
            .setDescription(`${interaction.options.get('description').value}`)
            .setColor(interaction.options.get('colour')?.value || '#0fdbc0')
            if (interaction.options.get('author')) {
                embed.setFooter({
                    iconURL: member.avatarURL(),
                    text: member.username
                });
                embed.setTimestamp()
            }
            
            
        if (interaction.options.get('ping')?.value || false) {
            pingVal = '@everyone'
        } else {
            pingVal = ''
        };

        interaction.reply({
            content: 'Poll has been sent',
            ephemeral: true,
        })

        const messageReply = await interaction.channel.send({
            content: pingVal,
            fetchReply: true,
            embeds: [embed],
        },)
        messageReply.react('👍')
        messageReply.react('👎')       

        
    },
};