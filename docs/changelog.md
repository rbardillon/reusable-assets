---
layout: default
title: Changelog
nav_order: 6
permalink: docs/changelog
---

# Changelog

All notable changes to this project are documented below.
{: .fs-6 .fw-300 }

---

## 2026-05-28

### Enhanced: GenAI Chat Tab

- **Image & Document upload** — Attach images (PNG, JPEG, GIF, WebP) and documents (PDF, HTML, TXT, CSV, DOC, DOCX, XLS, XLSX, MD, XML, JSON) for AI interpretation
- Unsupported image formats (e.g. AVIF) auto-converted to PNG via canvas
- ChatGPT-style composer UI: sticky bottom box with auto-grow textarea, file chips, circular attach/send buttons
- Multiple files can be attached per message
- Uses Infor GenAI LLM Service (`GENAI/llmsvc/api/v1/messages`) with `x-infor-logicalidprefix` header
- File type auto-detection: images sent as `image` blocks, documents sent as `document` blocks with format/name metadata

### Enhanced: Kiro Chat Tab

- Redesigned UI to match GenAI Chat — same ChatGPT-style composer with file chips, auto-grow textarea, and attach/send buttons
- File attachment support added (visual only — files shown as chips)

### Chore

- Refactored code structure for improved readability and maintainability
- Added changelog to docs-site
- Linked Key Features table on docs home page to individual feature pages

---

## 2026-05-26

### Enhanced: Custom BOD Generator Tab

- **Auto-register in Data Catalog** — After generating a .zap, prompts user to register the object schema in the Data Catalog via `DATAFABRIC/datacatalog/v1`
- Checks for existing noun before creating; warns and confirms overwrite if already present
- Builds minimal noun metadata XML and UTF-8 XSD payload for all three modes (Custom, Standard, Upload & Rename)
- Migrated Data Catalog API from deprecated `IONSERVICES` to `DATAFABRIC` endpoint
- **Standard BOD mode** — Select from pre-configured standard BOD templates (e.g. PurchaseOrder Sync Out) and rename with a custom noun prefix
- **Upload & Rename mode** — Upload any .zap file exported from MEC, specify the base noun to replace, and generate a renamed copy with your custom noun
- Auto-detects encoding (UTF-16BE, UTF-16LE, UTF-8) when reading uploaded files
- Auto-detects base noun from uploaded .zap filename
- Standard BOD templates are lazy-loaded (only downloaded when selected)
- Template data embedded as JSON to avoid H5 server 403 restrictions on static assets
- Added version log implementation block to all custom BOD .map templates
- Three-mode UI: Custom BOD / Standard BOD / Upload & Rename
- Enhanced upload process by extracting nouns and fields from XSD files

---

## 2026-05-25

### Enhanced: Dataflow List Tab

- Added DES-030 modal for generating export details document

### Enhanced: App Shell (About)

- Added attribution for XtendM3 CRUD Generator in about section

---

## 2026-05-24

### New: Generators Tab — H5 Script Link Generator

- Builds a debug URL using the M3 base URL from user context
- Local script URL input pre-filled with `http://localhost:8080/Script.js` (editable)
- Result auto-copied to clipboard

### Enhanced: Custom BOD Generator Tab

- Migrated to synchronous template generation with embedded JSON templates
- Removed legacy BOD template assets (previously served as static files)
- Files stored as `.txt` or `.mapxml` to avoid webpack source-map parsing issues and H5 server 403 restrictions

### Docs

- Added guidelines for updating documentation when implementing new features or changes

---

## 2026-05-23

### Docs

- Added Custom BOD Generator feature documentation page

---

## 2026-05-22

### Enhanced: App Shell

- Added documentation link to more actions menu and about section

---

## 2026-05-21

### Enhanced: App Shell

- Added more actions menu with refresh and about buttons

### Enhanced: Dataflow List Tab

- DES-030 document generation now supports custom list data and improved data handling

### Enhanced: Event Hub Formatter Tab

- Added 'Changes' column to event grid showing element-level change tracking

---

## 2026-05-17

### New: GenAI Chat Tab

- Session management (create, list, select sessions)
- Streaming chat with Infor GenAI service
- Message history display per session

---

## 2026-05-15

### Enhanced: Dataflow List Tab

- DES-030 DOCX generator with Infor-style formatting (cover page, TOC, connection points, deployment, recovery sections)
- Exclude specific groups and optimize row handling in DES-030 generation
- Added header logo images for document branding

---

## 2026-05-13

### Enhanced: Dataflow List Tab

- Added loading indicator for dataflow selection

### Enhanced: Object Schema Editor Tab

- Added loading indicator for object schema selection

### Enhanced: XtendM3 CRUD Generator Tab

- Added loading indicator for configuration selection

### Enhanced: Custom List Checker Tab

- Replaced mapping dropdown with lookup input field

### Enhanced: MEC Mapping Viewer Tab

- Replaced mapping dropdown with lookup input field

### Enhanced: App Shell (About)

- Updated versioning and copyright information
- Added author information

---

## 2026-05-12

### New: Custom BOD Generator Tab

- Generate CUSBOD mapping templates (.zap) from a noun, verb, direction, and custom field list
- Supports Sync, Acknowledge, Process, Show, and Load verbs with In/Out/Error Out directions
- Dynamic verb-direction constraints (e.g. Show = Out only, Load = In only)
- Full .map file content copied from original MEC templates (includes variables, links, implementations, sequences)
- Version log implementation block included in all templates
- Noun XSD and XML instance rebuilt with user-defined custom fields
- Output files encoded in UTF-16LE with BOM as required by MEC mapper
- Downloads as a ready-to-import .zap archive

### New: XtendM3 CRUD Generator Tab

- Generate full CRUD transactions (Add/Del/Get/Lst/Upd) for XtendM3 custom tables
- Upload transactions directly to M3 Extensibility API with auto-activation
- Upload table definitions to Foundation REST `importTables` endpoint (with CSRF)
- Save/load field configurations to M3 environment via EXT999MI
- Download as ZIP or export/import JSON configs
- User field auto-populated from M3 login (readonly when authenticated)
- Enhanced table upload with fallback download option

### New: MEC Mapping Viewer Tab

- Browse all MEC mappings in a filterable/sortable datagrid
- View compiled Java source code with Monaco editor (syntax highlighting, minimap, search)
- Shared Grid API service — mappings loaded once, cached across tabs
- Supports both admin and read-only MEC environments

### Enhanced: Custom List Checker Tab

- Added MEC mapping dropdown (fetched from Grid API `/grid/appui/EC_MT`)
- Select a mapping to auto-extract CMS100MI/MDBREADMI transactions
- Alternative to uploading ZAP files — same datagrid output
- Loading state indicator on dropdown

### Enhanced: Event Hub Formatter Tab

- Browse Event Hub subscriptions directly from the M3 environment
- Multi-select subscriptions with start time, time span, and criteria filters
- Results displayed in a filterable/sortable datagrid
- Row selection opens event detail in a Soho modal dialog
- Export events to CSV with flattened element columns
- Existing CSV/text formatting preserved

---

## 2026-05-11

### New: Kiro Chat Tab

- Chat component with backend integration (WSL + kiro-cli)
- Session management with create/list/select
- Loading animation for assistant messages
- Added `start.bat` script and README instructions for WSL backend setup

---

## 2026-04-21

### New: Dataflow List Tab

- Browse and inspect ION dataflows
- Copy dataflow info to clipboard with enhanced formatting

---

## 2026-04-07

### Enhanced: Custom List Checker Tab

- Updated datagrid component and enhanced related tables functionality
- Added JSON configuration for EXT100MI program modules and transactions

---

## 2026-04-01

### Enhanced: Object Schema Editor Tab

- Added clipboard functionality (copy XML to clipboard)
- Added XML formatting/pretty-print

---

## 2025-11-25

### Chore

- Initialized Angular application template with essential files and configurations

---

## 2025-10-18

### Enhanced: Object Schema Editor Tab

- Fixed `isBusy` implementation — proper RxJS chaining with `switchMap`, `finalize`, and error handling
- Added tenant-based noun filtering (GOLDWIN tenant check)

### Chore

- Standardized indentation across TypeScript files

---

## 2025-10-13

### Enhanced: XtendM3 CRUD Generator (standalone app)

- Added CRUD functionality and personalization features

---

## 2025-09-29

### Enhanced: XtendM3 CRUD Generator (standalone app)

- Added configuration lookup and save functionality
- Added `programName` and `user` parameters to builder constructors
- Integrated JSZip for file downloads
- Updated API targets to new Infor Cloud Suite endpoint
- Implemented `uploadToAPI` method for uploading generated JSON files

---

## 2025-09-28

### Initial Release

- Initial commit with project scaffolding
- Added datagrid template for testing
