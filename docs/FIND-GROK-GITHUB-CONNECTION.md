# Can’t find Grok in GitHub Installations? (help)

You often **won’t** see an app literally named “Grok” under GitHub → Installations.  
Grok/xAI auth works differently depending on product:

| Product | How GitHub access usually works |
|---------|----------------------------------|
| **Grok Build CLI** (`grok` in Terminal) | xAI login in browser; uses **your local `git` / `gh` credentials**, not a “Grok” GitHub App |
| **Grok web (grok.com)** | May show a GitHub connect button *inside Grok*, not under Installations |
| **GitHub Apps list** | Only if xAI published an app *and* you installed it |

## Step 0 — Wrong GitHub user?

You must be logged into GitHub as **`royalcarriage`** (the repo owner).

1. Open: https://github.com  
2. Top-right avatar → check username is **royalcarriage**  
3. If not: avatar → **Sign out** → sign in as royalcarriage  
4. Then open: https://github.com/settings/installations  

## Step 1 — Search every GitHub list (look for xAI / Grok / SpaceXAI)

Open each and **Ctrl+F / Cmd+F** for: `grok`, `xai`, `x.ai`, `spacex`

1. **Installed GitHub Apps**  
   https://github.com/settings/installations  

2. **Authorized OAuth Apps**  
   https://github.com/settings/applications  
   (tab: “Authorized OAuth Apps”)

3. **Authorized GitHub Apps**  
   https://github.com/settings/apps/authorizations  

4. **Fine-grained tokens**  
   https://github.com/settings/tokens?type=beta  

If **none** appear → Grok is **not** using a GitHub App on this account.  
Skip to **Workaround** below.

## Step 2 — Connect from inside Grok (browser)

1. Open https://grok.com (or https://x.com/i/grok)  
2. Open **Settings / Profile / Integrations / Apps** (gear icon)  
3. Look for **GitHub**, **Connect GitHub**, **Code**, or **Repositories**  
4. Click **Connect** → authorize as **royalcarriage**  
5. When GitHub asks “which repos?”, choose **Only select** → `authorityforge`  

If there is **no Connect GitHub** option, browser Grok cannot push to GitHub yet on your account.

## Step 3 — Grok Build CLI (Terminal) — best remote path on a laptop

This is what many people mean by “Grok connector” and it **does not show under Installations**.

```bash
# Install / update
curl -fsSL https://x.ai/cli/install.sh | bash

# Auth with xAI (browser opens)
grok

# Use GitHub as royalcarriage for push
gh auth status
# if not royalcarriage:
gh auth login -h github.com

# Work on AuthorityForge
cd ~/path/to/authorityforge   # or:
gh repo clone royalcarriage/authorityforge
cd authorityforge
grok "publish next post from content/queue.json and push main"
```

Push rights come from **`gh` / git as royalcarriage** (already **admin** on the repo), not from a Grok app listing.

## Workaround if you still can’t find anything (recommended)

You don’t need a Grok GitHub App if this is true:

| Check | Status for AuthorityForge |
|-------|---------------------------|
| Repo | `royalcarriage/authorityforge` |
| `royalcarriage` push/admin | ✅ Already true |

### Option A — Fine-grained PAT (for any remote machine)

1. While logged in as **royalcarriage**:  
   https://github.com/settings/personal-access-tokens/new  
   (or https://github.com/settings/tokens?type=beta )
2. Name: `grok-remote-authorityforge`
3. Resource owner: **royalcarriage**
4. Repositories: **Only select** → **authorityforge** (+ **royalcarriage.github.io** if needed)
5. Permissions → Repository permissions:
   - **Contents:** Read and write  
   - **Metadata:** Read  
   - **Pull requests:** Read and write  
6. Generate → **copy once**  
7. On the remote machine:

```bash
export GH_TOKEN=github_pat_...   # paste token
gh auth status
gh repo clone royalcarriage/authorityforge
cd authorityforge
# use Grok CLI or Cursor/Claude with this token in env
```

**Never** commit the token. Revoke it if leaked.

### Option B — Just use this Mac’s already-working access

From a machine where `gh` is already `royalcarriage`:

```bash
cd ~/.grok/work/authorityforge   # or your clone
git pull
grok   # or this Grok Build session
```

## Verify write (any method)

```bash
gh api repos/royalcarriage/authorityforge --jq .permissions
# need: "push": true
```

Or in browser as royalcarriage open:  
https://github.com/royalcarriage/authorityforge  

If you can see **Settings** on the repo, you own it.

## Still stuck?

Tell me **exactly** which product you’re using:

1. **grok.com chat in Chrome**  
2. **Grok Build CLI in Terminal** (`grok` command)  
3. **Something else** (Cursor, Claude, phone app)

And what you see on https://github.com/settings/installations (screenshot description: empty list? other apps only?).

Most people who “can’t find Grok” are on path **CLI or browser without a GitHub App** — use **Workaround A (PAT)** or **CLI + gh auth as royalcarriage**.
EOF

cd /Users/admin/.grok/work/authorityforge
git add docs/FIND-GROK-GITHUB-CONNECTION.md docs/FIND-GROK-GITHUB-CONNECTION.md 2>/dev/null
# file was FIND earlier - write the new comprehensive one
cp docs/FIND-GROK-GITHUB-CONNECTION.md /tmp/ 2>/dev/null
# we wrote FIND-GROK path - the write was to docs/FIND-GROK-GITHUB-CONNECTION.md via cat in previous - this write tool used write path docs/FIND-GROK...

git add docs/
git -c user.email='info@royalcarriagelimo.com' -c user.name='royalcarriage' commit -m 'docs: help finding Grok GitHub connection (often not under Installations)' 2>&1 | tail -8
git push origin main 2>&1 | tail -6

# open the help doc on github
open -a "Google Chrome" \
  "https://github.com/royalcarriage/authorityforge/blob/main/docs/FIND-GROK-GITHUB-CONNECTION.md" \
  "https://github.com/settings/installations" \
  "https://github.com/settings/applications" \
  "https://github.com/settings/tokens?type=beta" 2>&1 || true

echo DONE
ls docs/FIND*.md docs/GROK*.md 2>&1
