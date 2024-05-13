<script>
    import Ilmoitus from '$lib/components/Ilmoitus.svelte';
    import Kauppalista from '$lib/components/Kauppalista.svelte';
    import {kauppalista} from '$lib/stores.js';
</script>

<Ilmoitus />
<Kauppalista bind:asiat={$kauppalista} />
