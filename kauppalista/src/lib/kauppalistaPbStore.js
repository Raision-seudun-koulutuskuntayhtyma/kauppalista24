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

    async function lataaKauppalista() {
        try {
            const kauppalistanAsiat = await api.lataaKauppalista(listaId);
            vanhatIteemit = kauppalistanAsiat;
            taustaStore.set({tila: 'valmis', iteemit: kauppalistanAsiat});
        } catch (error) {
            console.error('Virhe:', error);
            taustaStore.set({
                tila: 'virhe',
                virhe: 'Kauppalistaa ei saatu ladattua',
            });
            return;
        }

        await api.kuunteleMuutoksia(listaId, ({action, record}) => {
            const idx = vanhatIteemit.findIndex((x) => x.id === record.id);
            let muuttunut = false;
            if (['create', 'update'].includes(action) && idx === -1) {
                // Uusi tai päivittynyt iteemi, jota ei ollut meidän listalla
                vanhatIteemit.push(record);
                muuttunut = true;
            } else if (['create', 'update'].includes(action) && idx !== -1) {
                // Iteemi, joka oli meidän listalla
                vanhatIteemit[idx] = record;
                muuttunut = true;
            } else if (action === 'delete' && idx !== -1) {
                // Iteemi poistunut, mutta löytyi vielä meidän listalta
                vanhatIteemit = [
                    ...vanhatIteemit.slice(0, idx),
                    ...vanhatIteemit.slice(idx + 1),
                ];
                muuttunut = true;
            }
            if (muuttunut)
                taustaStore.set({
                    tila: 'valmis',
                    iteemit: structuredClone(vanhatIteemit),
                });
        });
    }

    lataaKauppalista();

    return {
        ...taustaStore,
        set(arvo) {
            taustaStore.set(arvo);
            käsitteleMuutokset(vanhatIteemit, arvo.iteemit, {
                luoUusi: (iteemi) => api.luoKauppalistanAsia(listaId, iteemi),
                päivitä: api.päivitäKauppalistanAsia,
                poista: api.poistaKauppalistanAsia,
            });
            vanhatIteemit = structuredClone(arvo.iteemit);
        },
    };
}
