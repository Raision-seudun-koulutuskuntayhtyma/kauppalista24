<script>
    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {
        luoKauppalistanAsia,
        poistaKauppalistanAsia,
        asetaKauppalistanAsianValmis,
    } from '$lib/api';

    export let data;
    let uusiAsiaTeksti = '';
    let uusiAsiaVirhe = null;

    async function lisääAsia(e) {
        const teksti = uusiAsiaTeksti.trim();
        const asia = {id: String(Math.random()), teksti};
        uusiAsiaTeksti = '';
        data.asiat = [...data.asiat, asia];
        try {
            await luoKauppalistanAsia(data.LISTA_ID, teksti);
            uusiAsiaVirhe = '';
        } catch (error) {
            uusiAsiaVirhe = error.message;
        }
    }

    async function poistaAsia(e) {
        const {teksti} = e.detail; // SAMA KUIN: teksti = e.detail.teksti
        const {LISTA_ID} = data; // SAMA KUIN: LISTA_ID = data.LISTA_ID
        const poistoPromise = poistaKauppalistanAsia(LISTA_ID, teksti);
        data.asiat = data.asiat.filter((x) => x.teksti !== teksti);
        await poistoPromise;
    }

    async function käsitteleValmisMuutos(e) {
        const {teksti, valmis} = e.detail;
        await asetaKauppalistanAsianValmis(data.LISTA_ID, teksti, valmis);
    }
</script>

<Ilmoitus />
<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista
        asiat={data.asiat}
        on:poista-asia={poistaAsia}
        on:asian-valmis-muuttui={käsitteleValmisMuutos}
    />
    {#if uusiAsiaVirhe}
        <p class="error">{uusiAsiaVirhe}</p>
    {/if}
    <form class="uusi" on:submit={lisääAsia}>
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
    .komponentti {
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
</style>
