import {writable} from 'svelte/store';

export function paikallinenStore(avaimenNimi, alkuArvo) {
    const tallennettuArvo =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem(avaimenNimi)
            : undefined;
    let tallennettuTaiAlkuArvo = alkuArvo;
    if (tallennettuArvo) {
        tallennettuTaiAlkuArvo = JSON.parse(tallennettuArvo);
    }

    const taustaStore = writable(tallennettuTaiAlkuArvo);

    return {
        subscribe: taustaStore.subscribe,
        update: taustaStore.update,
        set: (arvo) => {
            localStorage.setItem(avaimenNimi, JSON.stringify(arvo));
            taustaStore.set(arvo);
        },
    };
}
