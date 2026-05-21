---
layout: default
title: XtendM3 CRUD Generator
parent: Features
nav_order: 1
---

# XtendM3 CRUD Generator
{: .no_toc }

Generate full CRUD transactions for XtendM3 custom tables and upload them directly to M3.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The XtendM3 CRUD Generator creates complete Add, Delete, Get, List, and Update transactions for custom dynamic tables. It handles code generation, direct upload to the M3 Extensibility API, and table definition management.

## Capabilities

### Transaction Generation
- Generates **Add**, **Del**, **Get**, **Lst**, and **Upd** transactions
- Configurable field definitions (name, type, length, mandatory, key)
- Auto-generates proper XtendM3 Groovy code with database operations

### Upload to M3
- Upload transactions directly to the M3 Extensibility API
- Auto-activation after upload
- Upload table definitions to Foundation REST `importTables` endpoint (with CSRF token handling)

### Configuration Management
- Save/load field configurations to M3 environment via `EXT999MI`
- Download generated code as ZIP archive
- Export/import JSON configurations for sharing

### User Context
- User field auto-populated from M3 login
- Read-only when authenticated within M3 session

## Usage

1. Define your table fields (name, type, length, key fields)
2. Click **Generate** to preview the CRUD transactions
3. Use **Upload** to push directly to M3, or **Download ZIP** for offline use
4. Optionally save your configuration for reuse via **Save Config**
