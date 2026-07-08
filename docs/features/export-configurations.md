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

---

## Overview

The Export Configurations tab provides two workflows for exporting M3 configuration data:

1. **Single Export** — Select a program and enter parameters to export one configuration at a time
2. **Bulk Export** — Open a modal with tabbed datagrids to select and export/download multiple configurations

Both use the H5 SDK `FormService.executeCommand('RUN', automationXml)` to trigger configuration exports, and the M3 Foundation REST file-management API to download the resulting zip files.

## Single Export

Select a program from the dropdown, fill in the required fields, then click "Export":

| Program                 | Fields                | List Option | FIELD1 Format                               |
| :---------------------- | :-------------------- | :---------- | :------------------------------------------ |
| CMS015 — Custom List    | Transaction           | 26          | `TRANS ID {transaction}`                    |
| CMS010 — Info Browser   | Category              | 26          | `INFOBROWSER_CMS010{category}_{date}`       |
| CRS021 — Sorting Option | Table, Sorting Option | 22          | `SORTING OPTION_CRS021{table}{sopt}_{date}` |

After export, a "Download" button appears to fetch the zip file from M3.

## Bulk Export Modal

Click **"Bulk Export"** to open the modal with 3 tabs:

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

The Custom List Checker tab has an **Export Config** icon button in the datagrid toolbar. Clicking it opens the same Bulk Export modal, pre-populated with distinct CMS015, CMS010, and CRS021 records from the current datagrid dataset.

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
