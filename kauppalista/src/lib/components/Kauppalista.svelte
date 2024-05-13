<script>
    import {ilmoitus} from '../stores';
    import Asia from './Asia.svelte';

    export let asiat;

    let uusiAsiaTeksti = '';

    const luoId = () => crypto.randomUUID().substring(0, 15);

    function lisääAsia() {
        const asia = {id: luoId(), teksti: uusiAsiaTeksti};
        asiat = [...asiat, asia];
        $ilmoitus = `Lisätty listalle: ${uusiAsiaTeksti}`;
        uusiAsiaTeksti = '';
    }

    function poistaAsia(e) {
        $ilmoitus = `Poistettu listalta: ${e.detail.teksti}`;
        asiat = asiat.filter((x) => x.id !== e.detail.id);
    }

    function käsitteleValmisMuutos(e) {
        const asia = e.detail;
        asia.valmis = !asia.valmis;
        asiat = asiat;
        if (asia.valmis) $ilmoitus = `Asetettu valmiiksi: ${asia.teksti}`;
        else $ilmoitus = `Asetettu keskeneräiseksi: ${asia.teksti}`;
    }
</script>

<div class="kauppalista">
    <h1>Kauppalista</h1>
    <ul>
        {#each asiat as asia (asia.id)}
            <Asia
                {asia}
                on:poista-asia={poistaAsia}
                on:asian-valmis-muuttui={käsitteleValmisMuutos}
            />
        {/each}
    </ul>
    <form class="uusi" on:submit|preventDefault={lisääAsia}>
        <label for="uusi-asia">Lisää uusi asia:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
            id="uusi-asia"
            name="asia"
            type="text"
            bind:value={uusiAsiaTeksti}
            required
            autofocus
        />
        <button>Lisää</button>
    </form>
</div>

<style>
    .kauppalista {
        color: hwb(120 5% 70%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
    }
    h1 {
        font-size: 200%;
    }
    .uusi {
        font-size: 125%;
    }
    label {
        display: block;
    }
    ul {
        font-size: 150%;
    }
</style>
