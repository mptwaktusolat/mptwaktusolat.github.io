# Malaysia Prayer Time Website

This is the website for Waktu Solat Malaysia project. Build with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

Run:

```sh
pnpm install
pnpm dev
```

All astro commands:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Running tests

Require Node.js 22.18+. From the project root, run:

```sh
node --test tests/*.test.ts
```

## Writing blog posts

Add Markdown files inside `src/content/blog/`, named `YYYY-MM-DD-post-slug.md` (eg: `2026-10-11-my-new-post.md`)

```markdown
---
title: My new post
description: A short description used on the blog index and in page metadata.
tags: ["waktu solat project", "design"]
updatedDate: "2026-10-12"
---

Write the article here using Markdown.
```

`title`, `description`, and `tags` are required; use `tags: []` for an untagged post.
`updatedDate` is optional: omit it until the article is updated, then set a quoted `YYYY-MM-DD`
date on or after publication.
