// PocketBase Utils

export function käsitteleMuutokset(vanhatIteemit, uudetIteemit, käsittelijät) {
    // Luo mäppäys iteemin id:stä iteemiin
    const vanhatIteemitIdnMukaan = vanhatIteemit.reduce(
        (m, i) => m.set(i.id, i),
        new Map()
    );

    // Tähän kerätään uusien iteemien id:t poistojen tarkistusta varten
    const uusienIteemienIdt = new Set();

    // Etsi uudet ja muuttuneet iteemit
    for (let iteemi of uudetIteemit) {
        uusienIteemienIdt.add(iteemi.id);
        const vanhaIteemi = vanhatIteemitIdnMukaan.get(iteemi.id);
        if (vanhaIteemi === undefined) {
            käsittelijät?.luoUusi?.(iteemi);
        } else if (!ovatkoTiedotSamoja(iteemi, vanhaIteemi)) {
            käsittelijät?.päivitä?.(iteemi, vanhaIteemi);
        }
    }

    // Tarkista onko jotain poistettu
    for (let iteemi of vanhatIteemit) {
        if (!uusienIteemienIdt.has(iteemi.id)) {
            käsittelijät?.poista?.(iteemi);
        }
    }
}

function ovatkoTiedotSamoja(obj1, obj2) {
    const isDiffKey = (avain) =>
        !yleisetPbAvaimet.has(avain) && obj1[avain] !== obj2[avain];
    if (Object.keys(obj1).some(isDiffKey)) return false;
    if (Object.keys(obj2).some(isDiffKey)) return false;
    return true;
}

const yleisetPbAvaimet = new Set([
    'collectionId',
    'collectionName',
    'created',
    'updated',
]);
