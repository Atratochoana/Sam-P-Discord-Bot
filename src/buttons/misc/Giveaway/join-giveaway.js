const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */


module.exports = (client,interaction) => {

    interaction.reply({
        ephemeral: true,
        content: `You have been registered for the giveaway. :tada:`
    });

    

}