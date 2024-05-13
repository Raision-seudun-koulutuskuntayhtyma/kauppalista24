<script>
    import {ilmoitus} from '../stores.js';
</script>

{#if $ilmoitus}
    <button on:click={() => ($ilmoitus = '')}>
        {$ilmoitus}
    </button>
{/if}

<style>
    button {
        font-size: 1.25rem;
        background-color: hsl(220, 75%, 75%);
        color: hsl(220, 50%, 5%);
        opacity: 75%;
        z-index: 100;
        position: fixed;
        left: 40vw;
        top: 1em;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
    }
</style>
