---
layout: default
title: Session Cache
parent: Features
nav_order: 13
---

# Grid API Session Cache

{: .no_toc }

Cache Grid API results in `sessionStorage` for instant loading with tenant-scoped keys.
{: .fs-6 .fw-300 }

## Table of contents

{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Grid API can take a long time to respond, especially when fetching MEC mappings. To avoid re-fetching every time the app loads or when navigating between tabs, `GridApiService` now caches results in `sessionStorage` with tenant-scoped keys.

## How it works

1. On first call, `getMappings()` fetches data from the Grid API and stores it in `sessionStorage`
2. On subsequent calls (same browser tab), data is returned instantly from cache
3. The cache key includes the tenant ID to prevent cross-tenant data leaks in multi-tenant environments
4. When the user closes the browser tab or logs out, `sessionStorage` is automatically cleared by the browser

## Cache key format

```
grid_api_cache_{tenant}_mappings
```

Example: `grid_api_cache_MYCOMPANY_DEV_mappings`

The tenant is resolved from the user context (`ctx.tenant` or `ctx.currentCompany`).

## Refreshing data

To fetch fresh data from the Grid API (bypassing cache), click the **Refresh** button in the app header (More menu → Refresh). This clears the session cache and reloads the page, forcing a fresh fetch from the Grid API.

Programmatically:

- Call `getMappings(true)` — the `bypassCache` parameter forces a fresh API call
- Call `clearCache()` — clears both in-memory and session cache for mappings
- Call `clearSessionCache()` — removes all grid API cache entries from sessionStorage

## Cache lifecycle

| Event                      | Behavior                                        |
| -------------------------- | ----------------------------------------------- |
| First app load             | Fetches from Grid API, stores in sessionStorage |
| Subsequent tab visits      | Returns from sessionStorage instantly           |
| `getMappings(true)` called | Bypasses cache, fetches fresh, updates cache    |
| `clearCache()` called      | Removes mapping entry from memory + session     |
| Browser tab closed         | sessionStorage cleared automatically            |
| User logs out of M3        | Session ends, cache cleared                     |
| Different tenant           | Separate cache key, no cross-contamination      |

## Storage limits

If `sessionStorage` quota is exceeded, the service clears all grid API cache entries and retries. This is handled gracefully without errors surfacing to the user.
