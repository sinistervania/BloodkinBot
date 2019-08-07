const botSettings = require("./bot-settings.json");
const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();




var initialWhitelist = require('./whitelist.json');
const pingMessage = "<@606574309317804086> I see whitelisted initials!";

var targetChannel;

bot.on("ready", async () => {
  console.log(`bot is ready!  ${bot.user.tag}`);
  targetChannel = bot.channels.get('473919224218124309');
  targetChannel.send("I'm connected. <3")
});


bot.on('message', (message) => {
  // role id check
  if (message.channel.id == '580049859445522443') {
    console.log(message.content)
  }
})

bot.on('message', (message) => {
  // add to whitelist
  if (message.channel.id == '580049859445522443') {
    let newInitials = message.content.match(/-.*$/)[0].replace(/-(.*)$/, "$1")
      .replace(/ /, '').replace(/ \./, '').toUpperCase();
    initialWhitelist.whitelist.push(newInitials);
    fs.writeFile('./whitelist.json', JSON.stringify(initialWhitelist), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }



  // ignores a message if they're not on the bot whitelist
  if (!botSettings.botWhitelist[message.author.id]) { return; }

  if (message.guild.id != '473890977858191380') { return; }

  //  let messageEmbed = message.embeds[0]
  //  console.log(messageEmbed)

  if (message.embeds.length > 0) {
    if (message.embeds[0].image) {
      if (message.embeds[0].description.includes('A waifu/husbando appeared')) {  //||
        //message.embeds[0].title.includes('A wild pok')) {
        let proxyURL = message.embeds[0].image.proxyURL;
        console.log(proxyURL);
        
        let initialsRegEx = /initials are \'(.*)\'/g;
        let initials = message.embeds[0].description.match(initialsRegEx)[0].replace(initialsRegEx, '$1')
          .replace(/\./g, '').replace(/ /g, '').toUpperCase();
        console.log(initials);

        if (initialWhitelist.whitelist.includes(initials)) {
          targetChannel.send(pingMessage);
        }
        //  if(proxyURL.includes('teapot')){ 
        //var ws = fs.createWriteStream('./images/teapot.jpg');
        //request.get(proxyURL).pipe(ws);

        //  }

      }
    }

  }

})

let authToken = process.env.AUTH_TOKEN ? process.env.AUTH_TOKEN : botSettings.auth.discord.authToken;

bot.login(authToken);
