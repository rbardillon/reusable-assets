---
layout: default
title: odin.json
parent: Configuration
nav_order: 1
---

# odin.json Configuration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The `odin.json` file configures the H5 SDK project name and proxy rules for local development. Proxy entries route API calls to the M3 Cloud environment during `ng serve`.

## Structure

```json
{
  "projectName": "reusable-assets",
  "proxy": {
    "/m3api-rest": {
      "target": "https://mingle-ionapi.<region>.inforcloudsuite.com/<TENANT>",
      "secure": false,
      "changeOrigin": true
    },
    "/mne": {
      "target": "https://<mne-host>:8080",
      "secure": false,
      "changeOrigin": true
    },
    "/ca": {
      "target": "https://<ca-host>:8080",
      "secure": false,
      "changeOrigin": true
    },
    "/kiro-chat": {
      "target": "http://localhost:3000",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": { "^/kiro-chat": "" }
    }
  }
}
```

## Proxy Entries

| Path | Target | Purpose |
|:-----|:-------|:--------|
| `/m3api-rest` | ION API Gateway | M3 API (MI) calls |
| `/mne` | MNE server | MEC/Event Hub endpoints |
| `/ca` | CA server | Grid API / Data Catalog |
| `/kiro-chat` | localhost:3000 | Local Kiro CLI backend |

## Deployment

When deployed as an H5 widget inside M3, proxy rules are not needed — the application runs within the same origin as M3 and inherits the session context.
