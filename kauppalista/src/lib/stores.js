import {writable} from 'svelte/store';

import {kauppalistaPbStore} from './kauppalistaPbStore';

export const ilmoitus = writable('Tervetuloa kauppalistalle!');

const LISTA_ID = '9j3zwlkpz05sti8';

export const kauppalista = kauppalistaPbStore(LISTA_ID);
