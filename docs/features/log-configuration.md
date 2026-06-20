---
layout: default
title: Log Configuration
parent: Features
nav_order: 12
---

# Log Configuration
{: .no_toc }

View and manage EC/MEC logger levels directly from the app.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Log Configuration tab connects to the Grid API's `LogConfigurationPage` to fetch all registered logger classes and their current log levels. Change any logger's level directly via the inline dropdown editor in the datagrid.

## Features

- **Inline dropdown editor** — Click the Level column on any row to select DEBUG, DIAG, INFO, WARN, ERROR, or FATAL
- **Loading indicator** — Busy indicator shown during API calls
- **Filter/search** — Keyword search and filter row to find specific logger classes
- **Soho datagrid** — Sortable, filterable, paginated grid with row height options

## How it works

1. On tab load, the app POSTs to `/grid/appui/EC_MT` with the `LogConfigurationPage` navigation target
2. The response contains a table of logger classes with their current level and available level options
3. When you change a level via the dropdown editor, it POSTs the same endpoint with `do: "class"`, `class: "<name>"`, and `level: "<level>"` params

## Use cases

- **Troubleshooting MEC mappings** — Set a specific mapping's generated class to DEBUG to capture detailed execution logs
- **Enabling event tracing** — Turn on DEBUG for `com.infor.ec.grid.rest.ProcessREST` to trace document processing
- **Production cleanup** — Quickly reset loggers back to INFO/WARN after debugging

## Available log levels

| Level | Description |
|-------|-------------|
| DEBUG | Verbose output for development/troubleshooting |
| DIAG  | Diagnostic-level output |
| INFO  | Standard operational messages |
| WARN  | Potential issues that don't block execution |
| ERROR | Failures that need attention |
| FATAL | Critical failures |
