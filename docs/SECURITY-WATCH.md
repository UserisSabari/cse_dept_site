# Security Watch — Unresolved Upstream Advisories

> **Last updated:** 2026-07-11
> **Audit tool:** `npm audit` (npm 10.x)
> **Reference issue:** #152

These advisories cannot be safely resolved today because the only available
"fix" is a **breaking major-version downgrade** of a critical dependency.
They are tracked here so the team has full context and a clear action plan.

---

## Advisory 1 — PostCSS XSS in CSS Stringify Output

| Field          | Value |
|----------------|-------|
| **GHSA ID**    | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) |
| **CVE**        | CWE-79 (XSS) |
| **CVSS**       | 6.1 (Moderate) — `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N` |
| **Affected**   | `postcss < 8.5.10` |
| **Where**      | `node_modules/next/node_modules/postcss@8.4.31` |
| **Introduced by** | `next@15.x` (vendors its own private copy of postcss@8.4.31 inside its bundle) |

### Why we cannot fix it today

`npm audit fix --force` proposes downgrading `next` to **v9.3.3** — a 6-major-version
rollback that would break the entire application. The upstream fix requires `next` to
bump its internal postcss dependency to `>=8.5.10`, which has happened in **Next.js 16.x**.

Upgrading to `next@16` is a breaking change that requires dedicated migration work
(new App Router APIs, React 19 strict mode changes, etc.) and is out of scope for
a patch release.

**An npm `overrides` cannot reach this instance** because Next.js vendors postcss
inside its own `node_modules/next/node_modules/` scope (a private sub-tree), making
it invisible to the root-level override resolver.

### Why the risk is low in practice

- `postcss` here is a **build-time / CSS-processing tool** inside Next.js internals.
  It is **not** serving user-facing responses at runtime.
- The XSS vector applies when postcss stringifies CSS containing `</style>` — an edge
  case that only matters when postcss output is embedded directly into HTML at runtime.
  Next.js uses postcss at **compile time only**.
- No application code imports `postcss` directly
  (confirmed: `grep -r 'from "postcss"' src/` returns zero results).

### Fix path

Upgrade `next` from `15.x → 16.x` once the team is ready for a migration sprint.
Track: <https://nextjs.org/docs/app/building-your-application/upgrading>

```bash
# When ready (do this in a dedicated migration branch):
npm install next@latest
npm run build   # verify no regressions
npm audit       # confirm postcss advisory is gone
```

---

## Advisory 2 — `effect` vulnerability inside `uploadthing`

| Field          | Value |
|----------------|-------|
| **GHSA ID**    | (tracked via effect@<=3.17.x upstream changelog) |
| **Affected**   | `effect@3.17.7` |
| **Where**      | `uploadthing@7.7.4` declares `"effect": "3.17.7"` as a direct dependency |
| **Also via**   | `@uploadthing/react@7.3.3` → `@uploadthing/shared@7.1.10` → `effect` |

### Current status — MITIGATED via npm override

`npm audit` no longer reports the `effect` advisory as of 2026-07-11 because
`package.json` contains:

```json
"overrides": {
  "effect": "^3.21.4"
}
```

This forces npm to resolve `effect` to `3.21.4` (latest stable) across the entire
dependency tree. The override is safe: `effect` uses semver and `3.21.4` is
backwards-compatible within the 3.x range.

**Verified with `npm ls effect` (2026-07-11):**

```
cse_dept_site@0.1.0
+-- @uploadthing/react@7.3.3
|   `-- @uploadthing/shared@7.1.10
|       `-- effect@3.21.4  (overridden)
`-- uploadthing@7.7.4
    +-- @effect/platform@0.90.3
    |   `-- effect@3.21.4  (overridden)
    `-- effect@3.21.4  (overridden)
```

### Future — remove the override when uploadthing bumps internally

Once `uploadthing` releases a version that declares `effect >= 3.21.x` natively,
remove the override entry from `package.json` to keep the tree clean:

```bash
npm view uploadthing dependencies.effect   # check if >= 3.21.x
```

---

## Monitoring Checklist

Re-run the following on the **first of each month** (or whenever a Dependabot PR arrives):

- [ ] `npm audit` — verify advisory count has not increased
- [ ] `npm view uploadthing dist-tags` — check if a newer version ships a patched `effect` natively
- [ ] `npm view next dist-tags` — check if the `backport`/`next-15-x` tag ships with `postcss >=8.5.10`
- [ ] Review any Dependabot PRs opened against this repo — merge promptly if CI passes
- [ ] When `next@16` migration is scheduled, coordinate with the team and remove the postcss watch entry here

### Quick one-liner audit command

```bash
npm audit --json | jq '[.vulnerabilities | to_entries[] | {pkg: .key, ghsa: [.value.via[] | select(type=="object") | .url]}]'
```

---

## Blast-Radius Confirmation (verified 2026-07-11)

Neither vulnerable package is directly imported in application source code:

```
grep -r 'from "effect"'  src/   -> no results
grep -r 'from "postcss"' src/   -> no results
```

Both are **purely transitive/internal** dependencies:
- `postcss` — vendored inside `node_modules/next/node_modules/` (isolated scope, override cannot reach it)
- `effect`  — transitive peer of `uploadthing`, overridden to `3.21.4` via npm `overrides`

---

*This file is maintained manually. See also [`.github/dependabot.yml`](../.github/dependabot.yml) for automated update tracking.*
