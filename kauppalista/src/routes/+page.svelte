<script>
    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalista} from '$lib/stores.js';

    let uusiAsiaTeksti = '';
    let uusiAsiaVirhe = null;

    function lisääAsia(e) {
        const teksti = uusiAsiaTeksti.trim();
        const asia = {id: String(Math.random()), teksti};
        uusiAsiaTeksti = '';
        $kauppalista = [...$kauppalista, asia];
    }

    function poistaAsia(e) {
        $kauppalista = $kauppalista.filter((x) => x.id !== e.detail.id);
    }

    function käsitteleValmisMuutos(e) {
        const asia = e.detail;
        asia.valmis = !asia.valmis;
        $kauppalista = $kauppalista;
    }
</script>

<Ilmoitus />
<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista
        asiat={$kauppalista}
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
