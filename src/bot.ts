import * as fs from 'fs';
import Discord from 'discord.js';

const botSettings = require("../bot-settings.json")
var initialWhitelist = require('../whitelist.json');

const bot: Discord.Client = new Discord.Client();
const pingMessage: string = "<@&474053859661185034> <@&553778764132253697> I see whitelisted initials!";

var targetChannel: Discord.TextChannel;

bot.on("ready", async () => {
  console.log(`bot is ready!  ${bot.user.tag}`);
  let channel: Discord.Channel | undefined = bot.channels.get('473919224218124309');
  if (!channel) {
    console.log('Cannot find channel to send message');
    return;
  }
  if (!((channel): channel is Discord.TextChannel => channel.type === 'text')(channel)) return;
  targetChannel.send("I'm connected. <3");
});


bot.on('message', (message) => {
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

        let initialsRegEx: RegExp = /initials are \'(.*)\'/g;
        let initialsMatches: RegExpMatchArray | null = message.embeds[0].description.match(initialsRegEx);
        if (!initialsMatches || !initialsMatches[0]) {
          return;
        }
        let initials: string = initialsMatches[0].replace(initialsRegEx, '$1')
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
