export const prepareCards = texto => {
    let resultado = [];

    let indiceCarta1 = texto.indexOf('Carta1:');
    if (indiceCarta1 === -1) {
        let indiceCarta2 = texto.indexOf('Carta2:');
        if (indiceCarta2 === -1) {
            let indiceCarta3 = texto.indexOf('Carta3:');
            if (indiceCarta3 === -1) {
                resultado.push({ texto });
                return resultado;
            } else {
                indiceCarta1 = indiceCarta3;
            }
        } else {
            indiceCarta1 = indiceCarta2;
        }
    }

    let textoAntesCartas = texto.substring(0, (indiceCarta1 - 2)).trim();
    resultado.push({ texto: textoAntesCartas });

    for (let i = 1; i <= 3; i++) {
        let cartaKey = `Carta${i}:`;
        let descKey = `Descripcion${i}:`;

        let indiceCarta = texto.indexOf(cartaKey, indiceCarta1);
        let indiceDesc = texto.indexOf(descKey, indiceCarta);

        if (indiceDesc === -1) {
            let descKey = `Descripción${i}:`;
            indiceDesc = texto.indexOf(descKey, indiceCarta);
        };

        if (indiceCarta !== -1 && indiceDesc !== -1) {
            let carta = texto.substring(indiceCarta + cartaKey.length, (indiceDesc - 1)).trim();
            let desc = texto.substring(indiceDesc + descKey.length).trim();

            resultado.push({ carta, texto: desc });
        }
    }
    console.log(resultado)
    return resultado;
};
