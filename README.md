# Dylan's Kitchen

Recipe blog at [food.dylanhoover.dev](https://food.dylanhoover.dev). Astro static site, hosted on GitHub Pages.

## Adding a recipe

1. Copy `src/content/recipes/sample-garlic-butter-pasta/` to a new folder. The folder name becomes the URL (`/recipes/<folder-name>/`).
2. Edit `index.md`: fill in the front matter, then write the ingredients and steps in markdown.
3. Drop your photos in the same folder and reference them with `./photo.jpg`. They are resized and converted to WebP at build time, so phone photos can go in as-is.
4. Set `draft: false` when it's ready. Drafts show up in `npm run dev` but never in a build.
5. `git add . && git commit -m "Add <recipe>" && git push`. GitHub Actions builds and deploys it.

Front matter fields: `title`, `description`, `date` (cooked), `cover`, `coverAlt`, `prepTime` / `cookTime` (minutes), `servings`, `tags`, `draft`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

Site name and tagline live in `src/config.ts`.

## Deploying (one-time setup)

1. Create a GitHub repo and push this project to its `main` branch.
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. At your DNS provider, add a `CNAME` record: `food` → `dylanhoover.github.io`.
4. Repo Settings → Pages → Custom domain: `food.dylanhoover.dev`, then enable **Enforce HTTPS** once the certificate is issued.

`public/CNAME` already contains the domain.
