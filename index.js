'use strict';
require("dotenv").config();

const Discord     = require('discord.js');
const validator   = require("validator");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN; // get your bot specific Token - https://discordapp.com/developers/applications/me/create

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);
});

client.on('message', message => {

  if (message.author.bot) return;

  if (isValid(String(message.content))) {
    const sides = message.content.slice(1);

    if(validator.isInt(sides) && parseInt(sides) > 0) {
      console.log(`Rolando dado de ${sides} lados.`);
      rollDice(message, sides);
    }
    
  }

});

client.on('error', data => {
  console.log('error', data);
});

client.login(DISCORD_TOKEN);

async function isValid(s) {

  if (s == undefined || s == null || s == '') return false;
  if (s.charAt(0) == 'd' && validator.isInt(String(s.slice(1))) && parseInt(String(s.slice(1))) > 0) return true;
  return false;

}

async function rollDice(message, sides) {
  try {

    message.reply(`**\n${String(Math.ceil(Math.random() * sides))}** <- d${sides}`);

  } catch (error) {
    console.log(error);
  }
}