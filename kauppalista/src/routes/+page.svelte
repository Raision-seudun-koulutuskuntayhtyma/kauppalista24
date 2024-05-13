<script>
    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalista} from '$lib/stores.js';
</script>

<Ilmoitus />
{#if $kauppalista.tila == 'valmis'}
    <Kauppalista bind:asiat={$kauppalista.iteemit} />
{:else if $kauppalista.tila == 'ladataan'}
    <div>Ladataan...</div>
{:else if $kauppalista.tila == 'virhe'}
    <div>Virhe: {$kauppalista.virhe}</div>
{/if}
