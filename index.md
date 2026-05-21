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

[Get Started]({{ site.baseurl }}{% link docs/getting-started/getting-started.md %}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View on GitHub](https://github.com/rbardillon/reusable-assets){: .btn .fs-5 .mb-4 .mb-md-0 }

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
| **Dataflow List** | Extract ION dataflow dependencies and generate DES-030 documents |
| **Object Schema Editor** | Browse and edit ION noun XSD definitions |
| **MEC Variable Validations** | Generate null-safe trim statements from MEC Java classes |
| **GenAI Chat** | AI chat interface powered by Infor's GenAI service |
| **Kiro AI Chat** | AI-powered chat assistant with WSL backend |
| **Generators** | Quick timestamp and UUID generators |

---

## Tech Stack

- **Framework:** Angular 18.2 with TypeScript
- **UI Library:** IDS Enterprise (Soho) via `ids-enterprise-ng`
- **M3 Integration:** `@infor-up/m3-odin` and `@infor-up/m3-odin-angular`
- **Code Editor:** Monaco Editor
- **Build Tool:** Angular CLI
