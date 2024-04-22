/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
    if (!e.record.nro) {
        const muutAsiat = $app.dao().findRecordsByFilter(
            'kauppalistan_asiat',
            "lista = {:listaId} && nro != ''",
            '-nro', // sort
            1, // limit
            0, // offset
            {listaId: e.record.get('lista')}
        );
        let suurinNumero = 0;
        if (muutAsiat.length) {
            suurinNumero = muutAsiat[0].get('nro') || 0;
        }
        const uusiNumero = suurinNumero + 1;
        e.record.set('nro', uusiNumero);
    }
}, 'kauppalistan_asiat');
