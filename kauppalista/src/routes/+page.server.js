import {fail} from '@sveltejs/kit';
import {lataaKauppalista, luoKauppalistanAsia} from '$lib/api';

const LISTA_ID = '9j3zwlkpz05sti8';  // TODO: Poista kovakoodattu LISTA_ID

export async function load() {
    const asiat = await lataaKauppalista(LISTA_ID);
    return {asiat, LISTA_ID};
}

export const actions = {
    lisääAsia: async ({request}) => {
        const data = await request.formData();
        const asia = data.get('asia')?.trim() ?? '';
        try {
            await luoKauppalistanAsia(LISTA_ID, asia);
        } catch (error) {
            return fail(422, {error: error.message});
        }
    },
};
