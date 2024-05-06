<script>
    import {createEventDispatcher} from 'svelte';

    export let teksti;

    const dispatch = createEventDispatcher();
</script>

<li>
    <input type="checkbox" />
    {teksti}
    <button on:click={() => dispatch('poista-asia', {teksti})}>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;
    }
</style>
