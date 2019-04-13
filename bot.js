const botSettings = require("./bot-settings.json");
const request = require('request');
const fs = require('fs');
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.on("ready", async () => {

  console.log(`bot is ready!  ${bot.user.tag}`);
  var targetChannel = bot.channels.get('473919224218124309');
  targetChannel.send('im connected.')
});



bot.on('message', (message) => {
  // ignores a message if they're not on the bot whitelist
  if (!botSettings.botWhitelist[message.author.id]) { return; }

  //  let messageEmbed = message.embeds[0]
  //  console.log(messageEmbed)

  if (message.embeds.length > 0) {
    if (message.embeds[0].image) {
      if (message.embeds[0].description.includes('A waifu/husbando appeared') ||
        message.embeds[0].title.includes('A wild pok')) {
        let proxyURL = message.embeds[0].image.proxyURL;
        console.log(proxyURL);

        //  if(proxyURL.includes('teapot')){ 
        var ws = fs.createWriteStream('./images/teapot.jpg');
        request.get(proxyURL).pipe(ws);

        //  }

      }
    }

  }

})


bot.login(botSettings.auth.discord.authToken);
