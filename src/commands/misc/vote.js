const { VoiceState } = require("discord.js");

module.exports = {
    name: "vote",
    description: "Creates a vote",
    options: [
        {
            name: "name",
            descripton: "What your vote is called",
            required: true,
        },
        {
            name: "description",
            description: "Descripton of the vote",
        },
    ],

    callback: (client,interaction) => {
        member = interaction.member
    }
}