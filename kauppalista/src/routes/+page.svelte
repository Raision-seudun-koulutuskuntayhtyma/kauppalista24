<script>
    import kuva from './tara-clark-Gk8LG7dsHWA-unsplash.jpg?enhanced&w=1920;960;640';

    const kuvaUrl =
        'https://unsplash.com/photos/woman-in-white-coat-holding-green-shopping-cart-Gk8LG7dsHWA';
    const kuvaaja = 'Tara Clark';
    const kuvaajaUrl = 'https://unsplash.com/@socialtyvr';
</script>

<h1>Tervetuloa!</h1>

<p>Tervetuloa tekemään kauppalistoja.</p>

<figure>
    <a href="/listat">
        <enhanced:img
            src={kuva}
            alt="Henkilö tekemässä ostoksia kaupassa"
            class="kuva"
        />
    </a>
    <figcaption>
        Kuva: <a href={kuvaajaUrl}>{kuvaaja}</a>,
        <a href={kuvaUrl}>Unsplash</a>
    </figcaption>
</figure>

<style>
    .kuva {
        border-radius: var(--pico-border-radius);
    }
    figcaption {
        text-align: right;
        font-size: 0.75rem;
        padding-top: 0;
        padding-right: var(--pico-border-radius);
    }
</style>
