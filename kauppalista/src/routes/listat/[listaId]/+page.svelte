<script>
    import {page} from '$app/stores';

    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalistaPbStore} from '$lib/kauppalistaPbStore';

    export const kauppalista = kauppalistaPbStore($page.params.listaId);
</script>

<Ilmoitus />

{#if $kauppalista.tila == 'valmis'}
    <Kauppalista bind:asiat={$kauppalista.iteemit} />
{:else if $kauppalista.tila == 'ladataan'}
    <span aria-busy="true">Ladataan...</span>
    <progress />
{:else if $kauppalista.tila == 'virhe'}
    <div>Virhe: {$kauppalista.virhe}</div>
{/if}
