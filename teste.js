const { isInt } = require('validator');

function getUltimoIndiceNumero(item) {

    let indice = 0;
    for(var i = 0; i < item.length; i++) {
        if (isInt(item[indice])) {
            indice = i;
        } else break;
    }
    return indice;

}

function main() {

    var v = ['522d10', '2d10']

    for (let i in v) {
        let item = v[i]

        if (item == undefined || item == null || item == '') {
            console.log("false")
            continue;
        }

        if (item.charAt(0) == 'd') {
            console.log('logica antiga')
            //redireciona para a logica nova com 1d
        }

        else if (isInt(item.charAt(0))) {
            let ultimoIndiceNumero = getUltimoIndiceNumero(item)

            let prefixo = item.slice(0, ultimoIndiceNumero)
            let sufixo = item.slice(ultimoIndiceNumero, item.length)

            console.log('logica nova')
            console.log(prefixo)
            console.log(sufixo)
        }


    }


}


main()