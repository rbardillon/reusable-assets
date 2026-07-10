---
layout: default
title: Export Configurations
parent: Features
nav_order: 13
---

# Export Configurations

{: .no_toc }

Automate M3 configuration exports and downloads via H5 Form Automation.
{: .fs-6 .fw-300 }

## Table of contents

{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Export Configurations tab provides a streamlined workflow for exporting M3 configuration data in bulk. Click **"Open Export Manager"** to open the modal with tabbed datagrids where you can select and export/download multiple configurations at once.

The modal uses H5 SDK `FormService.executeCommand('RUN', automationXml)` to trigger configuration exports, and the M3 Foundation REST file-management API to download the resulting zip files.

## Export Manager Modal

The modal has 5 tabs:

### CMS015 — Custom Lists

- Data from `CMS015MI/LstCustomMI`
- Multi-select rows, then Export & Download

### CMS010 — Info Browser

- Data from `CMS010MI/LstInfoCat`
- Multi-select rows, then Export & Download

### CRS021 — Sorting Options

- Enter a TABLE filter (e.g., `MITMAS`) and click "Load"
- If left empty, loads all tables but shows **user-defined only** (SOPT starting with a letter, not standard numeric ones)
- Multi-select rows, then Export & Download

### MDBREADMI — DB Read MI

- Data from `MRS001MI/LstTransactions` filtered by `MINM=MDBREADMI`
- Lists all transactions defined under the MDBREADMI program with transaction name, description, version, status, type, and dates
- Auto-loads on modal open (no filter required)
- Export filename format: `MDBREADMI_MRS010<TransactionName>_<YYYYMMDD>`
- Automation navigates MRS010, positions to MDBREADMI program, selects the transaction, and runs export option 26
- Multi-select rows, then Export & Download

### CMS047 — Alert Rules

- Data from `CMS045MI/LstAlertRules`
- Lists alert rules with Publisher (EVPB), Event Name (EVNM), Operation (EVNO), Alert Rule ID (ARID), Status, Description, Name
- Auto-loads on modal open
- Export uses CMS047 program with 4 keys: W1OBKV=EVPB, W2OBKV=EVNM, W3OBKV=EVNO, W4OBKV=ARID
- Only 2 fields: FIELD1 = `SAAGPR_CMS047_<EVPB>_<EVNM>_<EVNO>_<ARID>`, FIELD2 = date
- Multi-select rows, then Export & Download

### Actions Per Tab

| Button                | Behavior                                                                    |
| :-------------------- | :-------------------------------------------------------------------------- |
| **Export & Download** | Exports all selected, waits, checks file listing, downloads available files |
| **Export Only**       | Runs the automation for each selected row without downloading               |
| **Download Only**     | Downloads zip files for selected rows (must already be exported)            |

### Pre-check Before Download

Before downloading, the modal calls `GET M3/foundation-rest/file-management/v1/files%2Fconfig_data%2F` to list available files. Only files that exist are downloaded — missing ones are reported in the result dialog.

### Result Dialog

On completion, shows a summary with any failed/missing items listed by name:

- `exported` → automation ran but file not ready yet
- `not ready` → file not found in listing (retry later)
- `export error` → automation failed
- `download error` → file download failed

## Custom List Checker Integration

The Custom List Checker tab has an **Export Config** icon button in the datagrid toolbar. Clicking it opens the same Export Manager modal, pre-populated with distinct records from the current datagrid dataset:

- Records with `IBCA = 'MDBREADMI'` populate the **MDBREADMI** tab (TRID is used as the transaction name)
- All other records with non-empty `IBCA` populate the **CMS010** tab
- Records with non-MDBREADMI `TRID` values populate the **CMS015** tab
- Records with user-defined `SOPT` (starting with a letter) populate the **CRS021** tab

## Environment Configuration

For local development, set your ION API Bearer token in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  ionApiDevToken: "eyJraWQ...", // Paste your token here
};
```

This file is gitignored. The token is set once at app startup via `APP_INITIALIZER` — no per-component configuration needed. When deployed to H5, the token comes from the Grid session automatically.

## Technical Details

- Automation execution: `FormService.executeCommand('RUN', automationXml, { BMREQ: '' })`
- File download: `IonApiService.execute({ url: 'M3/foundation-rest/file-management/v1/...', responseType: 'blob' })`
- File listing: `GET M3/foundation-rest/file-management/v1/files%2Fconfig_data%2F`
- All modals are draggable by header with viewport containment

{: .note }
This feature requires the app to be running inside H5 (deployed) for the Form Automation to work. File downloads also require ION API access (either via H5 Grid session or a development token for localhost).
