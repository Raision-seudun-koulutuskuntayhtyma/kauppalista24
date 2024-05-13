<script>
    import Asia from './Asia.svelte';

    export let asiat;
</script>

<ul>
    {#each asiat as asia (asia.id)}
        <Asia {asia} on:poista-asia on:asian-valmis-muuttui />
    {/each}
</ul>

<style>
    ul {
        font-size: 150%;
    }
</style>
