<script>
    import Asia from './Asia.svelte';

    export let asiat;
</script>

<ul>
    {#each asiat as asia (asia.id)}
        <Asia teksti={asia.teksti} on:poista-asia />
    {/each}
</ul>

<style>
    ul {
        font-size: 150%;
    }
</style>
