const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require('discord.js');
const Level = require('../../models/Level');
const canvacord = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp')

module.exports = {
    name: 'level',
    description: 'Shows level of a person',
    options: [
        {
            name: 'target-user',
            description: 'The user that you are viewing',
            type: ApplicationCommandOptionType.Mentionable,
        }
    ],
    deleted: true,

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} Interaction 
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            interaction.reply('You can only run this command inside a server.');
            return
        }

        await interaction.deferReply()

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObj = interaction.options.get('target-user').member ||interaction.member

        const fetchedLevel = await Level.findOne({
            userId: targetUserId,
            guildId: interaction.guild.id
        });

        if (!fetchedLevel) {
            interaction.editReply(
                mentionedUserId ? `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.` : "You don't have any levels yet. Chat a little more first"
            );
            return
        }

        let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp');

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObj.user.displayAvatarURL({size: 256}))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            .setStatus(targetUserObj.presence.status)
            .setProgressBar('#FFC300', 'COLOR')
            .setUsername(targetUserObj.user.username)

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({files: [attachment] })
    },
}
