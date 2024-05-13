import {writable} from 'svelte/store';

export const ilmoitus = writable('Tervetuloa kauppalistalle!');

export const kauppalista = writable([
    {id: 'a', teksti: 'Paprika', valmis: false},
    {id: 'b', teksti: 'Omena', valmis: true},
]);
