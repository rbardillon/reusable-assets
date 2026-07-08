---
layout: default
title: Prerequisites
parent: Getting Started
nav_order: 1
---

# Prerequisites
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Required Software

| Software | Version | Purpose |
|:---------|:--------|:--------|
| Node.js | 18+ | Runtime |
| Angular CLI | 18.2+ | Build & serve |
| npm | 9+ | Package management |

## M3 Environment

The application requires access to an Infor M3 Cloud Edition environment with:
- ION API Gateway access
- M3 API (MI) endpoints
- Event Hub subscriptions (for Event Hub Formatter)
- XtendM3 Extensibility API (for CRUD Generator)
- Grid API (for MEC Mapping Viewer)

## Optional: Kiro Chat Backend

The Kiro Chat tab requires a local backend running in WSL. See [Kiro Chat Setup](../../configuration/kiro-chat-setup) for details.

## Installation

### 1. Install ODIN CLI

```bash
npm install -g @infor-up/m3-odin-cli
```

### 2. Verify Installation

```bash
odin -h
```

### 3. Install Angular CLI

```bash
npm install -g @angular/cli
```

### 4. Install project dependencies

```bash
cd reusable-assets
npm install
```

### 5. Download H5 SDK ION API file

Download the `.ionapi` file from your M3 tenant (ION API → Authorized Apps → Download Credentials).

### 6. Connect to M3

```bash
odin login -c <ion-api-file>
```

## Running the Application

```bash
odin serve --multi-tenant --ion-api
```

Or the shorthand:

```bash
odin serve -mi
```

Navigate to [http://localhost:8080](http://localhost:8080).

## Local ION API Access (Optional)

For features that call ION API directly (Export Configurations download, Object Schema Editor, GenAI Chat), you need a Bearer token when running locally:

1. Open your M3 H5 in the browser and log in
2. Open DevTools → Network → find any request with an `Authorization: Bearer` header
3. Copy the full token
4. Paste it in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  ionApiDevToken: 'eyJraWQ...',  // Your token here
};
```

{: .warning }
This file is gitignored. Tokens expire after ~2 hours. When deployed to H5, the token comes from the Grid session automatically — no manual config needed.

## Building for Deployment

```bash
odin build
```

The build artifacts will be in the `dist/` directory, ready to upload as an H5 SDK widget.

## Running Documentation Locally

Requires [Ruby](https://rubyinstaller.org/downloads/) (3.2+) installed and on your PATH.

```bash
cd docs-site
gem install bundler
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000).

To generate a PDF of the documentation:

```bash
cd docs-site
npm run pdf
```
