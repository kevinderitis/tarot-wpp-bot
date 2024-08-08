const diccionarioCartas = {
    el_ahorcado: "El Ahorcado",
    el_carro: "El Carro",
    el_diablo: "El Diablo",
    el_emperador: "El Emperador",
    el_ermitaño: "El Ermitaño",
    el_hierofante: "El Hierofante",
    el_juicio_final: "El Juicio Final",
    el_loco: "El Loco",
    el_mago: "El Mago",
    el_mundo: "El Mundo",
    el_sol: "El Sol",
    la_emperatriz: "La Emperatriz",
    la_estrella: "La Estrella",
    la_fuerza: "La Fuerza",
    la_justicia: "La Justicia",
    la_luna: "La Luna",
    la_muerte: "La Muerte",
    la_rueda_de_la_fortuna: "La Rueda de la Fortuna",
    la_sacerdotisa: "La Sacerdotisa",
    la_templanza: "La Templanza",
    la_torre: "La Torre",
    los_amantes: "Los Amantes",
};

const searchCard = name => {
    const card = diccionarioCartas[name];
    let response = card ? name : null;
    return response;
  };

export const prepareCardName = name => {
    let cardName = name.toLowerCase().replace(/ /g, '_');
    let response = searchCard(cardName);
    return response;
}
