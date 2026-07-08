---
layout: default
title: Custom List Checker
parent: Features
nav_order: 3
---

# Custom List Checker

{: .no_toc }

Validate custom list configurations from ZAP files or MEC mappings, and export configurations directly from the datagrid.
{: .fs-6 .fw-300 }

## Table of contents

{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Custom List Checker validates that CMS100MI/MDBREADMI transactions referenced in custom lists are properly configured. It supports both ZAP file upload and direct MEC mapping selection, and includes a built-in Export Config feature to bulk-export related M3 configurations.

## Capabilities

### ZAP File Upload

- Upload ZAP configuration files
- Automatically extracts CMS100MI/MDBREADMI transaction references
- Displays results in a filterable/sortable datagrid

### MEC Mapping Lookup

- Fetched from Grid API (`/grid/appui/EC_MT`)
- Select a mapping to auto-extract transaction references
- Loading state indicator while fetching mappings
- Alternative to uploading ZAP files — same datagrid output

### Export Config (Bulk Export)

- **Export Config** icon button in the datagrid toolbar (next to Refresh)
- Opens the Bulk Export modal pre-populated with distinct records from the current datagrid
- Automatically splits data into 3 tabs:
  - **CMS015** — Distinct Transaction IDs (TRID)
  - **CMS010** — Distinct Info Browser Categories (IBCA)
  - **CRS021** — Distinct FILE + SOPT combinations (user-defined only, excludes standard numeric options)
- Multi-select rows and export/download in one click
- Downloads configuration zip files from `M3/foundation-rest/file-management/v1/`

## Usage

**Option A — ZAP File:**

1. Click **Upload** and select a ZAP file
2. Review extracted transactions in the datagrid

**Option B — MEC Mapping:**

1. Select a mapping from the lookup field
2. Transactions are automatically extracted and displayed

**Exporting Configurations:**

1. Load data via ZAP upload or MEC mapping
2. Click the **Export Config** icon (📤) in the datagrid toolbar
3. The Bulk Export modal opens with pre-populated tabs
4. Switch to the desired tab (CMS015, CMS010, or CRS021)
5. Select rows using checkboxes (or "Select All")
6. Click **Export & Download** to trigger exports and download the zip files
7. Review the result dialog — any failed items are listed by name

{: .note }
The Export Config feature requires the app to be deployed inside H5 for automation to work. File downloads require ION API access.
