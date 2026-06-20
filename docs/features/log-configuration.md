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

The Log Configuration tab connects to the Grid API's `LogConfigurationPage` to fetch all registered logger classes and their current log levels. You can change levels individually or in bulk.

## Features

- **View all loggers** — Displays every configurable logger class with its current level
- **Change level per class** — Editable dropdown column to set DEBUG, INFO, WARN, ERROR, or FATAL immediately
- **Bulk level change** — Set all loggers or selected rows to a specific level
- **Filter/search** — Quickly find a specific logger class by name

## How it works

1. On tab load, the app POSTs to `/grid/appui/EC_MT` with the `LogConfigurationPage` navigation target
2. The response contains a table of logger classes with their current level and available level options
3. When you change a level via the dropdown, it POSTs the same endpoint with `do: "class"`, `class: "<name>"`, and `level: "<level>"` params
4. For bulk changes, it uses `do: "all"` instead

## Use cases

- **Troubleshooting MEC mappings** — Set a specific mapping's generated class to DEBUG to capture detailed execution logs
- **Enabling event tracing** — Turn on DEBUG for `com.infor.ec.grid.rest.ProcessREST` to trace document processing
- **Production cleanup** — Quickly reset all loggers back to INFO/WARN after debugging

## Available log levels

| Level | Description |
|-------|-------------|
| DEBUG | Verbose output for development/troubleshooting |
| INFO  | Standard operational messages |
| WARN  | Potential issues that don't block execution |
| ERROR | Failures that need attention |
| FATAL | Critical failures |
