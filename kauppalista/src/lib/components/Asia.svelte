<script>
    import {createEventDispatcher} from 'svelte';

    export let asia;

    const dispatch = createEventDispatcher();
</script>

<li>
    <input
        type="checkbox"
        checked={asia.valmis}
        on:change={() => dispatch('asian-valmis-muuttui', asia)}
    />
    <span class={asia.valmis ? 'valmis-rivi' : ''}>
        {asia.teksti}
    </span>
    <button on:click={() => dispatch('poista-asia', asia)}>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;
        display: flex;
        align-items: center;
    }
    button {
        margin-left: auto;
    }
    .valmis-rivi {
        text-decoration: line-through;
        color: gray;
    }
</style>
