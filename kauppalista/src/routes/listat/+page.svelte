<script>
    import {haeKauppalistat} from '$lib/api';

    const listatPromise = haeKauppalistat();
</script>

{#await listatPromise}
    <div aria-busy="true">Ladataan listoja...</div>
    <progress />
{:then listat}
    <ul>
        {#each listat as lista}
            <li><a href="/listat/{lista.id}">{lista.nimi}</a></li>
        {/each}
    </ul>
{:catch}
    <div>Virhe ladattaessa listoja.</div>
{/await}
