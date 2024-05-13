import {writable} from 'svelte/store';

import {paikallinenStore} from './paikallinenStore';

export const ilmoitus = writable('Tervetuloa kauppalistalle!');

export const kauppalista = paikallinenStore('kauppalista', [
    {id: 'a', teksti: 'Paprika', valmis: false},
    {id: 'b', teksti: 'Omena', valmis: true},
]);
