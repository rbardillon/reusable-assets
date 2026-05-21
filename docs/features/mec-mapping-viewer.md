---
layout: default
title: MEC Mapping Viewer
parent: Features
nav_order: 4
---

# MEC Mapping Viewer
{: .no_toc }

Browse MEC mappings and view compiled Java source code with syntax highlighting.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The MEC Mapping Viewer provides a read-only interface to browse all MEC (M3 Enterprise Collaborator) mappings in your environment and inspect their compiled Java source code.

## Capabilities

### Mapping Browser
- Filterable and sortable datagrid of all MEC mappings
- Shared Grid API service — mappings loaded once, cached across tabs
- Supports both admin and read-only MEC environments

### Code Viewer
- Monaco Editor integration for Java source code display
- Syntax highlighting, minimap, and search
- Read-only view of compiled mapping logic

## Usage

1. Browse mappings in the datagrid
2. Select a mapping row to load its Java source
3. Use Monaco's built-in search (`Ctrl+F`) to navigate the code
