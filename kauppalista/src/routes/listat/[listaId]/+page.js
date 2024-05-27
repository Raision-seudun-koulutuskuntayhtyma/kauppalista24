import * as api from '$lib/api.js';

export async function load({params, fetch}) {
    const lista = await api.lataaKauppalista(params.listaId, fetch);
    return {otsikko: lista.nimi};
}
