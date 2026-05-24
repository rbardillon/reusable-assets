---
layout: default
title: Generators
parent: Features
nav_order: 8
---

# Generators
{: .no_toc }

Quick utility generators for common development values.
{: .fs-6 .fw-300 }

---

## Overview

The Generators tab provides simple value generators that are frequently needed during M3 development and testing.

## Available Generators

| Generator | Output | Format |
|:----------|:-------|:-------|
| **Timestamp** | Current date/time | `YYYYMMDDHHmmssCC` (centiseconds) |
| **UUID** | Random UUID v4 | `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` |
| **H5 Script Link** | Debug URL for local H5 scripts | `{M3 Base URL}/?scriptCache=false&localScript={url}` |

## Usage

1. Select a generator from the dropdown
2. Click **Generate**
3. The result is automatically copied to your clipboard

## H5 Script Link

Builds a debug URL that loads a local script into the M3 H5 client, bypassing the script cache.

- The M3 base URL is automatically resolved from the user context (`Url` property)
- The **Local Script URL** input is pre-filled with `http://localhost:8080/Script.js` but can be edited
- Useful for testing H5 SDK scripts during development without redeploying

{: .note }
This generator requires the app to be running inside H5 (deployed) so the user context provides the M3 URL.
