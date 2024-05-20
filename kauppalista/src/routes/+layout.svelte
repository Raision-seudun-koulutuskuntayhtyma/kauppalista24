<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
    />
</svelte:head>

<header>
    <h1>Kauppalistat</h1>
    <nav>
        <ul>
            <li><a href="/">Etusivu</a></li>
            <li><a href="/listat">Listat</a></li>
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer></footer>

<style>
    header, main, footer {
        max-width: 40em;

    }
</style>