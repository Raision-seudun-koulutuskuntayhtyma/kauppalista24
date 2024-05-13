<script>
    import {createEventDispatcher} from 'svelte';

    import Asia from './Asia.svelte';

    export let asiat;

    const dispatch = createEventDispatcher();
    let uusiAsiaTeksti = '';
</script>

<div class="kauppalista">
    <h1>Kauppalista</h1>
    <ul>
        {#each asiat as asia (asia.id)}
            <Asia {asia} on:poista-asia on:asian-valmis-muuttui />
        {/each}
    </ul>
    <form
        class="uusi"
        on:submit|preventDefault={() => {
            dispatch('uusi-asia', {teksti: uusiAsiaTeksti.trim()});
            uusiAsiaTeksti = '';
        }}
    >
        <label for="uusi-asia">Lisää uusi asia:</label>
        <!-- svelte-ignore a11y-autofocus -->
        <input
            id="uusi-asia"
            name="asia"
            type="text"
            bind:value={uusiAsiaTeksti}
            required
            autofocus
        />
        <button>Lisää</button>
    </form>
</div>

<style>
    .kauppalista {
        color: hwb(120 5% 70%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
    }
    h1 {
        font-size: 200%;
    }
    .uusi {
        font-size: 125%;
    }
    label {
        display: block;
    }
    ul {
        font-size: 150%;
    }
</style>
