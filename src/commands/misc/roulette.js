
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  };

module.exports = {
    name: "roulette",
    description : 'Roulette for punishment, use to find out ;)',
    deleted: false,

    callback: (client,interaction) =>{
        user = interaction.member
        rndPunishment = getRndInteger(0,3);
        if (rndPunishment === 0){
            try {
                user.timeout(5*60*1000)
            } catch(error) { console.log(`There was an error: ${error}`)};
            interaction.reply("Enjoy ur timeout bozo");
            console.log(`${user.user.username} has been timedout`);
        };
        if (rndPunishment === 1){
            try {user.edit({
                mute: true
            })} catch(error){ console.log(`There was an error: ${error}`)};
            interaction.reply('Enjoy ur mute bozo');
            console.log(`${user.user.username} has been muted`);
        };
        if (rndPunishment === 3){
            try {user.edit({
                deaf: true
            })} catch(error){ console.log(`There was an error: ${error}`)};
            interaction.reply('Enjoy being deafen bozo');
            console.log(`${user.user.username} has been deafened`);
        };
    }
}