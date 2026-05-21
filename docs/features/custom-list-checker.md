---
layout: default
title: Custom List Checker
parent: Features
nav_order: 3
---

# Custom List Checker
{: .no_toc }

Validate custom list configurations from ZAP files or MEC mappings.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Custom List Checker validates that CMS100MI/MDBREADMI transactions referenced in custom lists are properly configured. It supports both ZAP file upload and direct MEC mapping selection.

## Capabilities

### ZAP File Upload
- Upload ZAP configuration files
- Automatically extracts CMS100MI/MDBREADMI transaction references
- Displays results in a filterable/sortable datagrid

### MEC Mapping Dropdown
- Fetched from Grid API (`/grid/appui/EC_MT`)
- Select a mapping to auto-extract transaction references
- Loading state indicator while fetching mappings
- Alternative to uploading ZAP files — same datagrid output

## Usage

**Option A — ZAP File:**
1. Click **Upload** and select a ZAP file
2. Review extracted transactions in the datagrid

**Option B — MEC Mapping:**
1. Select a mapping from the dropdown
2. Transactions are automatically extracted and displayed
