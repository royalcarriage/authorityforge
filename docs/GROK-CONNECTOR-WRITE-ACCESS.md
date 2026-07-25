# Grant Grok GitHub connector full read/write (remote work)

Grok’s GitHub connector is a **GitHub App / OAuth app**. Permissions cannot be flipped by the API with a normal `gh` user token — **you must click Authorize in the browser** while logged in as **`royalcarriage`**.

## Path A — Installed GitHub App (most common)

1. Open while logged in as **royalcarriage**:  
   **https://github.com/settings/installations**
2. Find **Grok** / **xAI** / **Grok by xAI**.
3. Click **Configure**.
4. **Repository access**
   - Select **All repositories**, **or**
   - **Only select repositories** → add:
     - `royalcarriage/authorityforge`
     - `royalcarriage/royalcarriage.github.io` (ads.txt root)
     - (optional) `royal-carriage/royal-carriage-enterprise` if you use Grok on RC
5. **Permissions** (Repository):
   - **Contents**: Read and write  
   - **Metadata**: Read-only  
   - **Pull requests**: Read and write (recommended for remote PRs)  
   - **Workflows**: Read and write (if Grok should edit Actions)  
   - **Administration**: optional (not required for normal pushes)
6. Click **Save**.
7. Return to **https://grok.com** → reconnect GitHub if prompted.

## Path B — Authorized OAuth Apps

1. **https://github.com/settings/applications**  
   (or **https://github.com/settings/apps/authorizations**)
2. Find **Grok** / **xAI**.
3. **Grant** / **Configure** → ensure **repo** (full control of private repositories) is allowed, or the modern equivalent Contents R/W.
4. Re-auth in Grok browser.

## Path C — Fine-grained PAT for remote agents (optional backup)

If the connector still fails, create a token for use only in Grok secrets (never commit it):

1. **https://github.com/settings/tokens?type=beta**
2. **Generate new token (fine-grained)**
3. Resource owner: **royalcarriage**
4. Repository access: **Only select** → `authorityforge` (+ `royalcarriage.github.io` if needed)
5. Permissions → Repository:
   - Contents: **Read and write**
   - Metadata: **Read**
   - Pull requests: **Read and write**
   - Workflows: **Read and write** (optional)
6. Generate → paste into Grok as a secret / connection if the UI allows a PAT.

## Verify (from any machine)

```bash
gh auth status   # should be royalcarriage
gh api repos/royalcarriage/authorityforge --jq .permissions
# expect: push true, admin true (or maintain)
```

In Grok browser, ask:

```text
List files at the root of https://github.com/royalcarriage/authorityforge and create a test branch write-test-remote with a small file, then open a PR.
```

If that works, remote write is good. Delete the test PR/branch after.

## Already confirmed on this Mac (CLI)

| Account | Repo | Access |
|---------|------|--------|
| royalcarriage | royalcarriage/authorityforge | admin + push ✅ |

The gap is only the **Grok product connector** identity, not the repo ACL for `royalcarriage`.
