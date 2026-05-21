---
layout: default
title: Home
nav_order: 1
description: "H5 SDK Reusable Assets — developer tools for M3 Cloud"
permalink: /
---

# Reusable Assets
{: .fs-9 }

A collection of developer tools built with Angular and the H5 SDK for Infor M3 Cloud.
{: .fs-6 .fw-300 }

[Get Started]({{ site.baseurl }}{% link docs/getting-started/getting-started.md %}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View on GitHub](https://github.com/infor-cloud/reusable-assets){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Overview

Reusable Assets is an Angular 18 application that provides productivity tools for M3 developers and consultants. It integrates with M3 APIs, ION, Event Hub, and XtendM3 to streamline common development workflows.

### Key Features

| Feature | Description |
|:--------|:------------|
| **XtendM3 CRUD Generator** | Generate full CRUD transactions for custom tables and upload directly to M3 |
| **Event Hub Formatter** | Browse, filter, and export Event Hub subscriptions |
| **Custom List Checker** | Validate custom list configurations from ZAP files or MEC mappings |
| **MEC Mapping Viewer** | Browse MEC mappings with Java source code viewer |
| **Kiro AI Chat** | AI-powered chat assistant with WSL backend |
| **DES030 Generators** | Generate Experience Designer configurations |
| **Custom BOD Generator** | Create custom BOD definitions |

---

## Tech Stack

- **Framework:** Angular 18.2 with TypeScript
- **UI Library:** IDS Enterprise (Soho) via `ids-enterprise-ng`
- **M3 Integration:** `@infor-up/m3-odin` and `@infor-up/m3-odin-angular`
- **Code Editor:** Monaco Editor
- **Build Tool:** Angular CLI
