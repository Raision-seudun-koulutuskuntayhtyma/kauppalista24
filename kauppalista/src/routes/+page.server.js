import {lataaKauppalista} from '$lib/api';

const LISTA_ID = '9j3zwlkpz05sti8';  // TODO: Poista kovakoodattu LISTA_ID

export async function load() {
    const asiat = await lataaKauppalista(LISTA_ID);
    return {asiat, LISTA_ID};
}
