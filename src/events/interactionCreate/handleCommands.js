const { devs, testServer, permission} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder } = require("discord.js");
const GiveAway = require('../../commands/misc/GiveAway');
const logInteraction = require('../../utils/logInteraction')

/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @returns 
 */

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();


  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    const memberId = interaction.member.id

    if (commandObject.permissionLevel >= 1) {

      if (permission[memberId] < commandObject.permissionLevel) {
        interaction.reply({
          content: `You do not have a sufficient permission level for this command.`,
          ephemeral: true,
        });
        return;
      }
    }
      
    

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    logInteraction(interaction)
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};