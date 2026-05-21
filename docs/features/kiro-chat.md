---
layout: default
title: Kiro AI Chat
parent: Features
nav_order: 5
---

# Kiro AI Chat
{: .no_toc }

AI-powered chat assistant with a local WSL backend.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Kiro Chat tab provides an AI chat interface powered by the Kiro CLI. It requires a local Node.js backend running in WSL that spawns `kiro-cli` and streams responses back via Server-Sent Events (SSE).

## Architecture

```
Angular App (localhost:4200)
  └─ proxy /kiro-chat/* ──▶ Node.js backend (localhost:3000)
                                └─ spawns kiro-cli in WSL
                                └─ streams SSE responses
```

## Setup

### 1. Install WSL

```powershell
wsl --install
```

### 2. Install Node.js 20+ in WSL

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install and authenticate Kiro CLI

```bash
npm install -g kiro-cli
kiro-cli login
```

### 4. Start the backend

Double-click `start.bat` in the project root, or manually:

```bash
wsl
cd /mnt/c/Users/<your-user>/Coding/kiro-chat-server
npm install
node server.js
```

### 5. Start the Angular app

```bash
ng serve
```

{: .note }
Both servers must be running simultaneously for the chat to work.

## Proxy Configuration

The proxy is configured in `odin.json`:

```json
{
  "/kiro-chat": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/kiro-chat": "" }
  }
}
```
