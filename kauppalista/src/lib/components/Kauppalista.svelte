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
    <form class="uusi" on:submit|preventDefault={lisääAsia}>
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <fieldset role="group">
            <!-- svelte-ignore a11y-autofocus -->
            <input
                id="uusi-asia"
                name="asia"
                type="text"
                placeholder="Uusi asia"
                bind:value={uusiAsiaTeksti}
                required
                autofocus
            />
            <button>Lisää</button>
        </fieldset>
    </form>
    <ul>
        {#each asiat as asia (asia.id)}
            <Asia
                {asia}
                on:poista-asia={poistaAsia}
                on:asian-valmis-muuttui={käsitteleValmisMuutos}
            />
        {/each}
    </ul>
</div>

<style>
    .kauppalista {
        color: hwb(120 5% 70%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
    }
    .uusi {
        font-size: 125%;
    }
    ul {
        font-size: 200%;
        padding-left: 0;
    }
</style>
