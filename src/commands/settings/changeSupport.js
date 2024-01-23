const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const ServerSettings =  require("../../models/ServerSettings");

module.exports = {
    name: "support-role",
    description: "set the support role",
    userPermissions: true,
    permissionLevel: 3,
    deleted: false,
    options: [
        {
            name: "role",
            description: "Which role will become the support role",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        
    ],

    callback: async (client, interaction) => {
        roleId = interaction.options.getRole("role")

        model = {
            guildId: interaction.guild.id,
            supportId: roleId,
        };
        
        if (await ServerSettings.findOne({guildId: interaction.guildId}) != null) {
            await ServerSettings.updateOne(model);
        }
        else {
            await ServerSettings(model).save()
        }

        
    }


    
}