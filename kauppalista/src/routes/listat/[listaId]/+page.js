import * as api from '$lib/api.js';

export async function load({params}) {
    const lista = await api.lataaKauppalista(params.listaId);
    return {otsikko: lista.nimi};
}
