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

The Kiro Chat tab requires a local backend running in WSL. See [Kiro Chat Setup](../configuration/kiro-chat-setup) for details.

## Installation

```bash
cd "reusable-assets"
npm install
```

## Running the Application

```bash
ng serve
```

Navigate to [http://localhost:4200](http://localhost:4200).

### Running inside H5 SDK

When deployed as an H5 SDK widget, the application runs within the M3 context and automatically inherits authentication from the user session.
