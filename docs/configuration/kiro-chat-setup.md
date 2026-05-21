---
layout: default
title: Kiro Chat Setup
parent: Configuration
nav_order: 2
---

# Kiro Chat Setup
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Prerequisites

- Windows with WSL installed
- Node.js 20+ inside WSL
- Kiro CLI installed and authenticated

## Step-by-step

### 1. Install WSL

```powershell
wsl --install
```

Restart if prompted.

### 2. Install Node.js in WSL

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install Kiro CLI

```bash
npm install -g kiro-cli
kiro-cli login
```

Follow the browser-based OAuth flow.

### 4. Start the backend

Use `start.bat` in the project root, or:

```bash
wsl
cd /mnt/c/Users/<your-user>/Coding/kiro-chat-server
npm install
node server.js
```

The backend starts on `http://localhost:3000`.

### 5. Verify

With both `ng serve` and the backend running, navigate to the **Kiro Chat** tab at [http://localhost:4200](http://localhost:4200).

{: .warning }
Both servers must be running simultaneously for the chat to function.
