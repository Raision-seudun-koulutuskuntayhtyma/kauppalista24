import PocketBase from 'pocketbase';

export async function lataaKauppalista(listaId) {
    const pb = getPocketBase();
    console.log(`Ladataan lista ${listaId} palvelimelta...`);
    const asiat = pb.collection('kauppalistan_asiat');
    const response = await asiat.getList(1, 1000, {
        filter: pb.filter('lista={:listaId}', {listaId}),
        sort: 'nro',
    });
    return response.items;
}

export async function luoKauppalistanAsia(listaId, teksti) {
    if (!teksti) throw Error('Teksti ei saa olla tyhjä');

    const pb = getPocketBase();
    const asia = await haeKauppalistanAsia(pb, listaId, teksti);
    if (asia) throw Error('Sama asia oli jo listalla');
    await pb.collection('kauppalistan_asiat').create({lista: listaId, teksti});
}

export async function poistaKauppalistanAsia(listaId, teksti) {
    const pb = getPocketBase();
    const asia = await haeKauppalistanAsia(pb, listaId, teksti);
    if (!asia) return;
    await pb.collection('kauppalistan_asiat').delete(asia.id);
}

async function haeKauppalistanAsia(pb, listaId, teksti) {
    const asiat = pb.collection('kauppalistan_asiat');
    const response = await asiat.getList(1, 1, {
        filter: pb.filter('lista={:listaId} && teksti={:teksti}', {
            listaId,
            teksti,
        }),
    });
    // kolmoisoperaattori: EHTO ? ARVO_JOS_EHTO_TOSI : ARVO_JOS_EHTO_EPÄTOSI
    return response.items.length ? response.items[0] : null;
}

function getPocketBase() {
    return new PocketBase('http://localhost:8090');
}
