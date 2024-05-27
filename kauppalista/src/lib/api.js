import PocketBase from 'pocketbase';

export async function haeKauppalistat() {
    const pb = getPocketBase();
    return await pb.collection('kauppalistat').getFullList();
}

export async function lataaKauppalista(listaId, fetch = undefined) {
    const pb = getPocketBase();
    const kauppalistat = pb.collection('kauppalistat');
    return await kauppalistat.getOne(listaId, {fetch});
}

export async function lataaKauppalistanAsiat(listaId) {
    const pb = getPocketBase();
    console.log(`Ladataan lista ${listaId} palvelimelta...`);
    const asiat = pb.collection('kauppalistan_asiat');
    const response = await asiat.getList(1, 1000, {
        filter: pb.filter('lista={:listaId}', {listaId}),
        sort: 'nro',
    });
    return response.items;
}

export async function luoKauppalistanAsia(listaId, asia) {
    if (!asia.teksti) throw Error('Teksti ei saa olla tyhjä');

    const pb = getPocketBase();
    const vanhaAsia = await haeKauppalistanAsia(pb, listaId, asia.teksti);
    if (vanhaAsia) throw Error('Sama asia oli jo listalla');
    await pb
        .collection('kauppalistan_asiat')
        .create({...asia, lista: listaId});
}

export async function poistaKauppalistanAsia(asia) {
    const pb = getPocketBase();
    await pb.collection('kauppalistan_asiat').delete(asia.id);
}

export async function päivitäKauppalistanAsia(asia) {
    const pb = getPocketBase();
    await pb.collection('kauppalistan_asiat').update(asia.id, asia);
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

export async function kuunteleMuutoksia(listaId, callback) {
    const pb = getPocketBase();
    const asiat = pb.collection('kauppalistan_asiat');
    return await asiat.subscribe('*', (data) => {
        if (data.record.lista === listaId) {
            callback(data);
        }
    });
}

function getPocketBase() {
    return new PocketBase('http://localhost:8090');
}
