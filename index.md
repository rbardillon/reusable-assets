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

[Get Started]({% link docs/getting-started/getting-started.md %}){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View on GitHub](https://github.com/rbardillon/reusable-assets){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Overview

Reusable Assets is an Angular 18 application that provides productivity tools for M3 developers and consultants. It integrates with M3 APIs, ION, Event Hub, and XtendM3 to streamline common development workflows.

### Key Features

| Feature | Description |
|:--------|:------------|
| [**XtendM3 CRUD Generator**]({% link docs/features/xtendm3-crud-generator.md %}) | Generate full CRUD transactions for custom tables and upload directly to M3 |
| [**Event Hub Formatter**]({% link docs/features/event-hub-formatter.md %}) | Browse, filter, and export Event Hub subscriptions |
| [**Custom List Checker**]({% link docs/features/custom-list-checker.md %}) | Validate custom list configurations from ZAP files or MEC mappings |
| [**MEC Mapping Viewer**]({% link docs/features/mec-mapping-viewer.md %}) | Browse MEC mappings with Java source code viewer |
| [**Dataflow List**]({% link docs/features/dataflow-list.md %}) | Extract ION dataflow dependencies and generate DES-030 documents |
| [**Object Schema Editor**]({% link docs/features/object-schema-editor.md %}) | Browse and edit ION noun XSD definitions |
| [**MEC Variable Validations**]({% link docs/features/mec-variable-validations.md %}) | Generate null-safe trim statements from MEC Java classes |
| [**GenAI Chat**]({% link docs/features/genai-chat.md %}) | AI chat interface powered by Infor's GenAI service |
| [**Kiro AI Chat**]({% link docs/features/kiro-chat.md %}) | AI-powered chat assistant with WSL backend |
| [**Custom BOD Generator**]({% link docs/features/custom-bod-generator.md %}) | Generate CUSBOD mapping templates (.zap) for MEC import |
| [**Generators**]({% link docs/features/generators.md %}) | Quick timestamp, UUID, and H5 Script Link generators |

---

## Contributors

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>

---

## Tech Stack

- **Framework:** Angular 18.2 with TypeScript
- **UI Library:** IDS Enterprise (Soho) via `ids-enterprise-ng`
- **M3 Integration:** `@infor-up/m3-odin` and `@infor-up/m3-odin-angular`
- **Code Editor:** Monaco Editor
- **Build Tool:** Angular CLI
