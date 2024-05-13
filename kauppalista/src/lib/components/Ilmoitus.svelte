<script>
    import {onDestroy} from 'svelte';
    import {fly} from 'svelte/transition';
    import {elasticOut} from 'svelte/easing';

    import {ilmoitus} from '../stores.js';

    export let piilotusViiveMs = 3000; // 3000 ms = 3 sekuntia
    let näkyvissä = false;
    let ajastimenKahva = undefined;

    function viestinTaiViiveenMuuttuessa(viesti, viiveMs) {
        clearTimeout(ajastimenKahva);
        if (!viesti) {
            näkyvissä = false;
        } else {
            näkyvissä = true;
            ajastimenKahva = setTimeout(() => (näkyvissä = false), viiveMs);
        }
    }
    $: viestinTaiViiveenMuuttuessa($ilmoitus, piilotusViiveMs);

    onDestroy(() => clearTimeout(ajastimenKahva));
</script>

{#if näkyvissä}
    <button
        on:click={() => (näkyvissä = false)}
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
        font-size: 1.25rem;
        background-color: hsl(220, 75%, 75%);
        color: hsl(220, 50%, 5%);
        opacity: 75%;
        z-index: 100;
        position: fixed;
        left: 40vw;
        top: 1em;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
    }
</style>
