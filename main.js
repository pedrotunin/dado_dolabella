const validator = require('validator');

async function main(text) {

    if (text.charAt(0) == 'd') {

        if (isValid(String(text))) {
          const sides = text.slice(1);
    
          if(validator.isInt(sides) && parseInt(sides) > 0) {
            console.log(`Rolando 1 dado de ${sides} lados.`);
            rollDices(sides, 1);
          }
    
        }
    
    } else if (validator.isInt(text.charAt(0))) {
        
        const ultimoIndiceNumero = await getUltimoIndiceNumero(text);

        console.log('ultimo indice: ' + ultimoIndiceNumero);
    
        const prefixo = text.slice(0, ultimoIndiceNumero);
        const sufixo = text.slice(ultimoIndiceNumero, text.length);

        console.log(prefixo + ' ' + sufixo)
    
        const sides = sufixo.slice(1);
    
        if(validator.isInt(sides) && parseInt(sides) > 0) {
          console.log(`Rolando ${prefixo} dado(s) de ${sides} lados.`);
          rollDices(sides, parseInt(prefixo));
        }
    
    }

}


async function isValid(s) {

    if (s == undefined || s == null || s == '') return false;
    if (s.charAt(0) == 'd' && validator.isInt(String(s.slice(1))) && parseInt(String(s.slice(1))) > 0) return true;
    return false;
  
  }
  
  async function rollDices(sides, dices) {
    try {
  
      var sum = 0;
      var results = [];
  
      for (var i = 0; i < dices; i++) {
        var result = Math.ceil(Math.random() * sides);
        sum += result;
        results.push(result);
      }
  
      //message.reply(`**\n${String(Math.ceil(Math.random() * sides))}** <- d${sides}`);
      console.log(`\n**${sum}** <- [${results}] ${dices}d${sides}`);
  
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

main('2D10')