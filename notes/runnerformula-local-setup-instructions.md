# RunnerFormula — Local Environment Setup Instructions

Paste this file's contents (or its path) into a new chat to get `btilus/runnerformula` running locally on this same Windows machine. It captures the working recipe and gotchas discovered while setting up `btilus/accountabilityguild` locally, so the new session doesn't have to rediscover them.

**Machine context:** Windows 11, PowerShell 5.1 + Git Bash both available. Node.js 24.18.0 and PostgreSQL 16 are already installed system-wide (installed while setting up AccountabilityGuild) — a fresh shell process should see them on PATH automatically. GitHub CLI (`gh`) and Docker are **not** installed.

---

## 0. Repo owner and target directory

- Repo: `https://github.com/btilus/runnerformula` (private, owned by GitHub user `btilus`; not the same account as the token holder, `tilusg-git`, who is a collaborator).
- Suggested local path: `C:\Users\tilus\Claude\Projects\RunnerFormula\repo` (mirrors the AccountabilityGuild project layout — adjust if the user specifies otherwise).

## 1. Verify prerequisites before reinstalling anything

```bash
node --version   # expect v24.18.0
npm --version
git --version
```

If any of these say "command not found" in Bash or PowerShell, it's almost certainly a **stale PATH in that specific shell process**, not a missing install — Node/Postgres were added to the machine PATH but already-open shell sessions don't pick it up. Confirm before reinstalling:

```powershell
[System.Environment]::GetEnvironmentVariable("Path","Machine")
Test-Path "C:\Program Files\nodejs\node.exe"
```

If the file exists but the command isn't found, prepend it inline per command (PATH edits don't persist between tool calls in this environment):

```bash
export PATH="$PATH:/c/Program Files/nodejs:/c/Program Files/PostgreSQL/16/bin"
```

Only fall back to `winget install -e --id OpenJS.NodeJS.LTS` if the file genuinely doesn't exist.

## 2. Clone the private repo — use a classic PAT, not fine-grained

**This is the step that will silently fail if done the "obvious" way.** Two dead ends to skip past:

- **Git Credential Manager** (the default when you just run `git clone https://github.com/...`): hangs forever in a non-interactive shell tool waiting for a prompt it can't complete. Don't attempt it here — go straight to a PAT.
- **Fine-grained PAT**: will 403/404 even with all permissions granted, if the token's account (`tilusg-git`) doesn't *own* the repo — fine-grained PAT repo-pickers only list repos you own or org repos with fine-grained access enabled, **not** repos you're merely a collaborator on. Since `btilus` owns `runnerformula` and `tilusg-git` is a collaborator, a fine-grained PAT will not be able to select it at all.

**Do this instead:** ask the user for a **classic PAT** with the `repo` scope, generated at `github.com/settings/tokens` → "Generate new token (classic)". Then clone with a one-time auth header so the token is never written to disk in `.git/config`:

```bash
TOKEN='paste-classic-pat-here'
AUTH=$(printf 'x-access-token:%s' "$TOKEN" | base64 -w0)
git -c http.extraHeader="Authorization: Basic $AUTH" clone https://github.com/btilus/runnerformula.git repo
unset TOKEN AUTH
```

Verify the clone worked and the token didn't leak into the remote URL:

```bash
cd repo && git remote -v   # should show a clean https URL, no token
```

If it fails, diagnose against the API directly rather than retrying blindly:

```bash
curl -s -i -H "Authorization: Bearer $TOKEN" https://api.github.com/repos/btilus/runnerformula
```
A 404 here means the token's account can't see the repo at all (ownership/collaborator issue, see above) — not a scope problem.

## 3. Read the repo's own docs before assuming the stack

Don't assume this is another Next.js + Prisma app — check what's actually there first:

```bash
ls repo
cat repo/README.md
```

Look for `package.json` (Node), `requirements.txt`/`pyproject.toml` (Python), `go.mod` (Go), `Gemfile` (Ruby), `docker-compose.yml`, `.env.example`, and any `AGENTS.md`/`CLAUDE.md` with project-specific setup or agent instructions — follow whatever the repo's own README says over these generic steps.

## 4. Database — reuse the existing local Postgres, don't reinstall

A PostgreSQL 16 server is already installed and running as a Windows service (`postgresql-x64-16`) on port 5432, with a known superuser login:

- Superuser: `postgres` / `postgres`

If RunnerFormula needs Postgres, create a separate database/user for it (don't reuse AccountabilityGuild's `accountability` db):

```bash
export PATH="$PATH:/c/Program Files/PostgreSQL/16/bin"
PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -c "CREATE USER runnerformula WITH PASSWORD 'runnerformula';"
PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -c "CREATE DATABASE runnerformula OWNER runnerformula;"
```

**Known limitation:** the current shell user is not a Windows admin and cannot restart the `postgresql-x64-16` service or reload its config (`pg_ctl reload` fails with "Operation not permitted"). This only matters if you need to edit `pg_hba.conf` again — the above `CREATE USER`/`CREATE DATABASE` commands work fine as-is since they don't require a restart. If you do hit a permissions wall, the working pattern was: write a PowerShell script that edits `pg_hba.conf` to `trust`, restarts the service, does the DB work, restores `pg_hba.conf`, restarts again — then ask the user to run it from an elevated ("Run as Administrator") PowerShell window, since this session can't self-elevate.

If RunnerFormula's stack isn't Node/Postgres (e.g. it's Python or uses SQLite/MySQL), ignore this section and follow the repo's own instructions instead.

## 5. Install dependencies and run

Generic Node path (adjust for whatever `package.json` scripts actually exist):

```bash
export PATH="$PATH:/c/Program Files/nodejs"
cd repo
npm install
cp .env.example .env   # if present — fill in DATABASE_URL etc. per step 4
```

**If `npm install` reports packages "not covered by allowScripts"** (e.g. Prisma), postinstall codegen was skipped — run it explicitly, e.g.:

```bash
npx prisma generate   # only if the project uses Prisma
```

Then start the dev server per whatever `npm run dev` (or equivalent) the repo defines, run it as a background task, and verify with the Browser tools (`preview_start` → `navigate` → `get_page_text`) rather than assuming success from the process starting — screenshots may time out in this environment, so prefer `get_page_text` / `read_page` / `read_console_messages` for verification.

## 6. Secrets hygiene

- Never write the PAT into `.git/config`, `.env`, or any committed file — the one-time `-c http.extraHeader` approach in step 2 keeps it out of persisted config.
- Generate fresh random values for any `*_SECRET` env vars rather than leaving placeholder text, e.g.:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
