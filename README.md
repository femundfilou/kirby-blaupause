![Kirby Blaupause – Kirby CMS Starter Kit](kirby-blaupause.png)
# Kirby Blaupause – A Template for Kirby CMS

This template is a starter for new projects, mainly developed out of personal needs and inspired by the awesome [Kirby Baukausten](https://github.com/tobimori/kirby-baukasten). It's based on the tools and technologies we work with.

## Frontend features
- pnpm + Vite
- CSS (using [lightingcss](https://lightningcss.dev/) for vendor prefixes etc.)
- Typescript
- Svelte (optional)

## Composer dependencies
- vlucas/phpdotenv
- lukaskleinschmidt/kirby-laravel-vite
- femundfilou/kirby-asset-manager
- tobimori/kirby-seo
- getkirby/staticache
- getkirby/cli
- distantnative/retour-for-kirby

## Custom folder setup
This template uses a custom folder setup. The kirby installation is divided by two individual folders `public` and `backend` to keep kirby's internal files out of the domain root. Since we're often using pipelines to deploy website updates, the `storage` folder keeps all static things available, like `content`, `accounts`, `sessions`, `logs` and `license`, that don't always change on a website update.

The `frontend` is the last folder remaining and it's the home of all frontend source files. We're using Vite to build assets and a `manifest.json` to `public/build`, where they're consumed by kirby.

## Initialize using Kirby CLI
When cloning this repository, you can run `kirby init` to get rid of some of the boilerplate code and naming conventions. The script will guide you through the steps. You have to install the [Kirby CLI](https://github.com/getkirby/cli) (globally) to use that command.

## License
MIT

## Credits
- [Tobias Möritz](https://github.com/tobimori) for his work in [Kirby Baukausten](https://github.com/tobimori/kirby-baukasten)
- [Justus Kraft](https://github.com/jukra00)
