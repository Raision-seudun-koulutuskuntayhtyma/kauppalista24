<script>
    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalista} from '$lib/stores.js';

    function lisääAsia(e) {
        const {teksti} = e.detail;
        const asia = {id: String(Math.random()), teksti};
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
<Kauppalista
    asiat={$kauppalista}
    on:uusi-asia={lisääAsia}
    on:poista-asia={poistaAsia}
    on:asian-valmis-muuttui={käsitteleValmisMuutos}
/>
