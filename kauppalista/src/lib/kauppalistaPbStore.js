import {writable} from 'svelte/store';

import * as api from './api';
import {käsitteleMuutokset} from './pbUtils';

/* Storen sisällön vaihtoehdot

    Kun ladataan palvelimelta:
    {
        tila: 'ladataan',
    }

    Kun ladattu:
    {
        tila: 'valmis',
        iteemit: [{id: "obj1"}, {id: "obj2"}],
    }

    Jos virhe:
    {
        tila: 'virhe',
        virhe: 'Virheen teksti',
    }
*/

export function kauppalistaPbStore(listaId) {
    const taustaStore = writable({tila: 'ladataan'});

    let vanhatIteemit = undefined;

    api.lataaKauppalista(listaId)
        .then((kauppalistanAsiat) => {
            vanhatIteemit = kauppalistanAsiat;
            taustaStore.set({tila: 'valmis', iteemit: kauppalistanAsiat});
        })
        .catch((error) => {
            console.error('Virhe:', error);
            taustaStore.set({
                tila: 'virhe',
                virhe: 'Kauppalistaa ei saatu ladattua',
            });
        });

    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
            käsitteleMuutokset(vanhatIteemit, arvo.iteemit, {
                luoUusi: (iteemi) => api.luoKauppalistanAsia(listaId, iteemi),
                päivitä: api.päivitäKauppalistanAsia,
                poista: api.poistaKauppalistanAsia,
            });
            vanhatIteemit = arvo.iteemit;
        },
    };
}
