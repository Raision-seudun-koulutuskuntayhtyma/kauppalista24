<script>
    import {createEventDispatcher} from 'svelte';

    export let teksti;
    export let valmis;

    const dispatch = createEventDispatcher();
</script>

<li>
    <input
        type="checkbox"
        checked={valmis}
        on:change={() => {
            valmis = !valmis;
            dispatch('asian-valmis-muuttui', {teksti, valmis})
        }}
    />
    <span class={valmis ? 'valmis-rivi' : ''}>
        {teksti}
    </span>
    <button on:click={() => dispatch('poista-asia', {teksti})}>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;
    }
    .valmis-rivi {
        text-decoration: line-through;
        color: gray;
    }
</style>
