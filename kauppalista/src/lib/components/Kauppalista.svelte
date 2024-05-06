<script>
    import Asia from './Asia.svelte';

    export let asiat;
</script>

<ul>
    {#each asiat as asia}
        <Asia teksti={asia} on:poista-asia />
    {/each}
</ul>

<style>
    ul {
        font-size: 150%;
    }
</style>
