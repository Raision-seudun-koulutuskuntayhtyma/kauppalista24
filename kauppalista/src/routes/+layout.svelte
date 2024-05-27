<script>
    import {page} from '$app/stores';

    import './global.scss';

    $: url = $page.route.id;
</script>

<header>
    <nav>
        <ul>
            <li>
                <strong>
                    Kauppalista24
                    {#if $page.data.otsikko}
                        / {$page.data.otsikko}
                    {/if}
                </strong>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/" aria-current={url == '/'}>Etusivu</a>
            </li>
            <li>
                <a href="/listat" aria-current={url == '/listat'}>Listat</a>
            </li>
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer></footer>

<style>
    header,
    main,
    footer {
        max-width: 30em;
    }
</style>
