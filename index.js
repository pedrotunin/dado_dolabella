'use strict';
require("dotenv").config();

const Discord     = require('discord.js');
const validator   = require("validator");

const DISCORD_TOKEN = process.env.DISCORD_TOKEN; // get your bot specific Token - https://discordapp.com/developers/applications/me/create

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);
});

client.on('message', async message => {

  if (message.author.bot) return;

  if (message.content == undefined || message.content == null || message.content.length == 0) return;

  message.content = message.content.toLowerCase();

  if (message.content.charAt(0) == 'd') {

    if (isValid(String(message.content))) {
      const sides = message.content.slice(1);

      if(validator.isInt(sides) && parseInt(sides) > 0) {
        console.log(`Rolando 1 dado de ${sides} lados.`);
        rollDices(message, sides, 1);
      }

    }

  } else if (validator.isInt(message.content.charAt(0))) {

    const ultimoIndiceNumero = await getUltimoIndiceNumero(message.content);

    const prefixo = message.content.slice(0, ultimoIndiceNumero);
    const sufixo = message.content.slice(ultimoIndiceNumero, message.content.length);
    const sides = sufixo.slice(1);
    
    if(validator.isInt(sides) && parseInt(sides) > 0) {
      console.log(`Rolando ${prefixo} dado(s) de ${sides} lados.`);
      rollDices(message, sides, parseInt(prefixo));
    }

  }

})

client.on('error', data => {
  console.log('error', data);
});

client.login(DISCORD_TOKEN);

async function isValid(s) {

  if (s == undefined || s == null || s == '') return false;
  if (s.charAt(0) == 'd' && validator.isInt(String(s.slice(1))) && parseInt(String(s.slice(1))) > 0) return true;
  return false;

}

async function rollDices(message, sides, dices) {
  try {

    var sum = 0;
    var results = [];

    for (var i = 0; i < dices; i++) {
      var result = Math.ceil(Math.random() * sides);
      sum += result;
      results.push(result);
    }

    message.reply(`**\n${sum}** <- [${results}] ${dices}d${sides}`);

  } catch (error) {
    console.log(error);
  }
}

async function getUltimoIndiceNumero(item) {

  let indice = 0;
  for(var i = 0; i < item.length; i++) {
      if (validator.isInt(item[indice])) {
          indice = i;
      } else break;
  }
  return indice;

}
