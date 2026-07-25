# AuthorityForge content pipeline

## How it works

```
content/queue.json  (status: queued)
        │
        ▼  publish-next.mjs   (weekly Action or manual)
content/posts/<slug>.md
        │
        ▼  build-blog.mjs
blog/<slug>/index.html + blog/index.html
        │
        ▼  build-sitemap.mjs
sitemap.xml + llms.txt
        │
        ▼  git push main
      Vercel deploy
```

## Commands

```bash
# scaffold a draft post
npm run new:post -- "My Title"

# take next queue item → markdown post
npm run publish:next

# rebuild HTML from all markdown posts
npm run build

# full local pipeline
npm run pipeline
```

## Queue format

```json
{
  "posts": [
    {
      "id": "unique-id",
      "slug": "url-slug",
      "title": "Title",
      "description": "Meta description",
      "tags": ["seo"],
      "hub": "/systems/topical-clusters/",
      "status": "queued",
      "outline": ["Section A", "Section B"]
    }
  ]
}
```

Statuses: `queued` → `published` (pipeline) · use `draft` on posts to skip build.

## GitHub Actions

Workflow: `.github/workflows/content-pipeline.yml`

| Trigger | Behavior |
|---------|----------|
| **Tuesday 15:00 UTC** | Publish next queue item + rebuild + push |
| **workflow_dispatch** | Manual run; optional LLM + dry_run |

### Optional LLM quality

1. Repo **Settings → Secrets** → `OPENAI_API_KEY`
2. Run workflow with **use_llm = true**  
   (sets `AF_USE_LLM=1`)

Without the secret, posts are still auto-created from the **template + outline** (safe default).

## Quality rules (do not remove)

- No fabricated stats or fake ratings schema  
- One intent per URL  
- Link to hub from every post  
- Prefer queue outlines reviewed by a human for money pages  

## Activate

1. Ensure Vercel is connected to `royalcarriage/authorityforge` on `main`
2. Keep topics in `content/queue.json`
3. Either wait for Tuesday cron or: **Actions → Content pipeline → Run workflow**
