<script>
    import {onDestroy} from 'svelte';
    import {fly} from 'svelte/transition';
    import {elasticOut} from 'svelte/easing';

    import {ilmoitus} from '../stores.js';

    export let piilotusViiveMs = 3000; // 3000 ms = 3 sekuntia
    let näkyvissä = false;
    let ajastimenKahva = undefined;

    function poistaIlmoitus() {
        $ilmoitus = '';
        näkyvissä = false;
    }

    function viestinTaiViiveenMuuttuessa(viesti, viiveMs) {
        clearTimeout(ajastimenKahva);
        if (!viesti) {
            näkyvissä = false;
        } else {
            näkyvissä = true;
            ajastimenKahva = setTimeout(poistaIlmoitus, viiveMs);
        }
    }
    $: viestinTaiViiveenMuuttuessa($ilmoitus, piilotusViiveMs);

    onDestroy(() => clearTimeout(ajastimenKahva));
</script>

{#if näkyvissä}
    <button
        on:click={poistaIlmoitus}
        transition:fly={{
            delay: 250,
            duration: 500,
            x: 0,
            y: -100,
            opacity: 0.5,
            easing: elasticOut,
        }}
    >
        {$ilmoitus}
    </button>
{/if}

<style>
    button {
        background-color: var(--pico-secondary-background);
        color: var(--pico-secondary-inverse);
        border-width: 0px;
        opacity: 90%;
        z-index: 100;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 1em;
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
    }
</style>
