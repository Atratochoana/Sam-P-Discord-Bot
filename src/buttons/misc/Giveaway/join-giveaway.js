const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const GiveAway =  require("../../../models/GiveAway");

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */


module.exports = async (client,interaction) => {

    messageId = interaction.message.id

    const query = {
        UserId: interaction.user.id,
        MessageId: messageId,
    };

    try {
        giveAway = await GiveAway.findOne();  // if there is already an entry

        if (giveAway) return

        const newGiveAway = GiveAway({
            UserId: interaction.user.id,
            MessageId: messageId,
        })

        await newGiveAway.save()

    } catch (error) {
        console.log(error)
    }


    interaction.reply({
        ephemeral: true,
        content: `You have been registered for the giveaway. :tada:`
    });

    
    

}