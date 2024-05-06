<script>
    import {enhance} from '$app/forms';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {poistaKauppalistanAsia} from '$lib/api';

    export let data;
    export let form;

    async function poistaAsia(e) {
        const {teksti} = e.detail; // SAMA KUIN: teksti = e.detail.teksti
        const {LISTA_ID} = data; // SAMA KUIN: LISTA_ID = data.LISTA_ID
        const poistoPromise = poistaKauppalistanAsia(LISTA_ID, teksti);
        data.asiat = data.asiat.filter((x) => x.teksti !== teksti);
        await poistoPromise;
    }
</script>

<div class="komponentti">
    <h1>Kauppalista</h1>
    <Kauppalista asiat={data.asiat} on:poista-asia={poistaAsia} />
    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}
    <form class="uusi" method="POST" action="?/lisääAsia" use:enhance>
        <label for="uusi-asia">Lisää uusi asia:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
            id="uusi-asia"
            name="asia"
            type="text"
            value={form?.asia ?? ''}
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
