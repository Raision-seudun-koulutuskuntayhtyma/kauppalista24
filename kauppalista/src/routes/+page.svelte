<script>
    import kuva from './tara-clark-Gk8LG7dsHWA-unsplash.jpg';

    const kuvaUrl =
        'https://unsplash.com/photos/woman-in-white-coat-holding-green-shopping-cart-Gk8LG7dsHWA';
    const kuvaaja = 'Tara Clark';
    const kuvaajaUrl = 'https://unsplash.com/@socialtyvr';

    // TODO: Nopeuta kuvien latausta enhanced-img:n avulla:
    // https://kit.svelte.dev/docs/images
</script>

<h1>Tervetuloa!</h1>

<p>Tervetuloa tekemään kauppalistoja.</p>

<figure>
    <a href="/listat">
        <img src={kuva} alt="Henkilö tekemässä ostoksia kaupassa" />
    </a>
    <figcaption>
        Kuva: <a href={kuvaajaUrl}>{kuvaaja}</a>,
        <a href={kuvaUrl}>Unsplash</a>
    </figcaption>
</figure>
<style>
    img {
        border-radius: var(--pico-border-radius);
    }
    figcaption {
        text-align: right;
        font-size: 0.75rem;
        padding-top: 0;
        padding-right: var(--pico-border-radius);
    }
</style>
