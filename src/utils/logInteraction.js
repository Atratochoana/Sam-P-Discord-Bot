WEBHOOK = "https://discord.com/api/webhooks/1177571117771259915/YLMTUGmkc1B9lZeUvrdqr2XfuSm1hCLXfQM1CKbXjB-0ft3jOzOsCxJd4cequ4D3r2MF"
const { WebhookClient, Webhook } = require("discord.js");

//db stuff needs adding

module.exports = (interaction) => {

    const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1177571117771259915/YLMTUGmkc1B9lZeUvrdqr2XfuSm1hCLXfQM1CKbXjB-0ft3jOzOsCxJd4cequ4D3r2MF" });

    let interactionName = "Null"
    if (interaction.type === 2) interactionName = interaction.commandName;
    if (interaction.type === 3) interactionName = interaction.customId;

    webhook.send({
        content: `[<@${interaction.user.id}> | ${interaction.user.id}] used the interaction: ${interactionName} ||in the channel [${interaction.channel} | ${interaction.channelId}] in the guild [${interaction.guild} | ${interaction.guildId}] created at {<t:${interaction.createdTimestamp}:R>}||`
    })
}
    
