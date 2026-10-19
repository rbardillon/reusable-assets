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

## 2026-10-19

### Changed: Grid UI REST Fully Removed — All Tabs on ION API Gateway

- Migrated the last Grid UI REST consumers (Custom List Checker and Dataflow List) onto the standard ION API Gateway administration API and removed `GridApiService` entirely — no tab scrapes `/grid/appui/*` anymore
- Added `getMiInfo()` to `MecMappingAdminService` (`GET /v1/mappings/mi-info`), returning both MI program/transaction pairs and the resolved MEC map(s)
- Pre-warm and restart cache-clear now use the gateway-backed `MecMappingAdminService`

### Added: Dataflow List — MEC Map Group

- The Dataflow List related-objects view now shows a dedicated **MEC Map** group resolved from the MI-info API
- When multiple maps match, only the single most recently published version is shown

### Changed: MEC Mapping Viewer & Custom List Checker — Full Mapping Columns

- The mapping lookup in both tabs now shows Mapping Name, Version, State, Published By, Published date, and Standard

### Fixed: MEC Mapping Viewer — Source Loading Indicator

- A busy indicator now appears over the editor while the Java source loads, with a loading placeholder instead of stale content

### Changed: MEC Mapping Viewer — ION API Gateway Data Source

- The MEC Mapping Viewer now fetches its mapping list and Java source from the standard ION API Gateway administration API (`GET M3/iec/api/administration/v1/mappings` and `GET /v1/mappings/{name}/{version}/source`) instead of the internal Grid UI REST scrape
- New `MecMappingAdminService` calls the gateway through `IonApiService` with a tenant-keyed session cache, replacing the Viewer's use of `GridApiService`
- `GridApiService` is otherwise unchanged and still serves other tabs
- The MEC Map Download tab is unchanged

### Changed: Log Configuration — ION API Gateway Data Source

- Log Configuration tab now reads loggers and sets log levels through the standard ION API Gateway administration API (`/v1/log-config/loggers`, `/levels`, `/class`) instead of the internal Grid UI REST scrape
- New `LogConfigAdminService` calls the gateway through `IonApiService`; the logger list is read fresh on each load (not cached) because it is live config
- Level dropdown options come from `GET /log-config/levels?context=class` when available, with a hardcoded fallback
- Removed the unused log methods from `GridApiService`, which is otherwise unchanged and still serves other tabs

---

## 2026-09-30

### Added: Object Schema Editor — Metadata Editing

- Update mode now loads and edits the noun metadata XML (NounMetadata) alongside the XSD schema
- New collapsible **Edit Metadata** panel to edit Noun Name, ID XPath (document identifier), and Supported Verbs
- Replace the last segment of the ID XPath to change which field is used as the document ID
- Edited metadata is sent in the update payload (previously the fetched metadata was passed through unchanged)
- Added `getNounMetadataXml()` and `buildNounPayloadWithMetadata()` to the data catalog service

### Changed: Object Schema Editor — Read-only Noun Name & Document ID Validation

- Noun Name is now read-only in the metadata panel
- The Document ID combines a field picker dropdown with an editable ID XPath text box; the text box is the source of truth and supports advanced XPath (predicates/selectors like `DocumentID[1]/ID[not(@schemeName)]`) the picker cannot express
- The dropdown traverses nested structures, listing fields as noun-relative paths (e.g. `Data/CONO`) so deeply nested fields are selectable, not just the noun's direct children
- Fixed a crash that prevented the Edit Metadata panel from opening — the field picker is now a native select instead of a Soho dropdown, which also makes the refresh button reflect schema changes immediately
- The metadata panel now opens whenever a noun is selected, even if its metadata XML failed to load
- The whole ID XPath is validated against the schema structure on save (not just the last segment); advanced XPath steps (functions, wildcards, non-positional predicates) are accepted without structural checking so valid selector-based IDs are not blocked
- Inline error messages name the invalid segment and list the valid children at that level

---

## 2026-07-17

### Improved: MEC Map Download — Session Storage Caching

- Mapping list is now cached in session storage (same pattern as Custom List Checker's Grid API caching)
- Extracted caching logic into `MecMapCacheService` for reuse and preloading
- Mappings are preloaded at application startup so the list is ready when the tab is opened
- Header toolbar "Refresh" button clears MEC mapping cache alongside Grid API cache
- Deduplicates concurrent requests via a shared loading promise

---

## 2026-07-10

### Added: MDBREADMI Export Tab

- New "MDBREADMI — DB Read MI" tab in the Bulk Export Modal
- Lists all MDBREADMI transactions via `MRS001MI/LstTransactions`
- Supports Export & Download, Export Only, and Download Only with multi-select
- Automation navigates MRS010, selects MDBREADMI program and transaction, exports via option 26
- Export filename: `MDBREADMI_MRS010<TransactionName>_<YYYYMMDD>`
- Auto-loads transaction list on modal open

### Changed: Export Configurations Simplified

- Removed single-export dropdown and free-text fields — all exports now go through the bulk modal
- Reduces errors since values come from actual M3 data rather than manual entry

### Changed: Custom List Checker — MDBREADMI Separation

- Records with `IBCA = 'MDBREADMI'` now populate the MDBREADMI tab instead of CMS010
- CMS015 tab excludes MDBREADMI transactions for cleaner separation

### Added: CMS047 Export Tab (Alert Rules)

- New "CMS047 — Alert Rules" tab in the Export Manager modal
- Lists alert rules via `CMS045MI/LstAlertRules` (Publisher, Event Name, Operation, Alert Rule ID)
- Automation navigates CMS047 with 4 keys (EVPB, EVNM, EVNO, ARID), exports via option 26
- FIELD1: `SAAGPR_CMS047_<EVPB>_<EVNM>_<EVNO>_<ARID>`

---

## 2026-07-09

### New: MEC Map Download Tab

- Download MEC mappings as .zap files via the IEC MapGen REST API
- Select mapping from lookup, download via ION API Gateway, decode and extract to .zap archive
- Output includes .map file (UTF-16), schema .xsd files, and mapping.properties
- Compatible with MEC Mapper's import function
- Real-time download log shows extraction progress

### Enhanced: Object Schema Editor — GenAI Assist & Add Mode

- Added radio button toggle to switch between "Add" and "Update" modes
- **Add mode**: Enter a new noun name, use GenAI to describe and generate XSD, then register the schema in ION Data Catalog
- **Update mode**: Select existing noun from dropdown, use GenAI to describe modifications, then update the schema
- GenAI button (sparkle icon) toggles a collapsible prompt panel for natural language schema generation/modification via Infor GenAI LLM Service
- Register Schema flow includes existence check with overwrite confirmation
- Automatically extracts field names from generated XSD for noun metadata registration

### Enhanced: Custom BOD Generator — GenAI-Assisted Noun Properties

- Added GenAI button next to "Noun Properties" label in the Custom BOD form
- Describe noun properties in natural language and the LLM generates PascalCase field names
- Generated fields populate the list and can be manually edited, reordered, or removed

---

## 2026-07-08

### New: Export Configurations Tab

- Single-item export: Select program (CMS015/CMS010/CRS021), fill in parameters, execute automation and download zip
- Uses `FormService.executeCommand('RUN', automationXml)` — the working MUA pattern for H5 Form Automation
- Download via `M3/foundation-rest/file-management/v1/` (ION API)
- Preview of generated FIELD1 and FIELD2 values before execution

### New: Bulk Export Modal

- Accessible from Export Configurations tab ("Bulk Export" button) and Custom List Checker datagrid toolbar (export icon)
- 3 tabbed datagrids: CMS015 (Custom Lists), CMS010 (Info Browser), CRS021 (Sorting Options)
- Multi-select with checkbox column and "Select All" header
- CMS015 loads from `CMS015MI/LstCustomMI`
- CMS010 loads from `CMS010MI/LstInfoCat`
- CRS021 has collapsible accordion filter for TABLE name; loads user-defined sorting options only (SOPT starting with letter)
- Three actions per tab: Export & Download, Export Only, Download Only
- Pre-checks file listing API (`GET files/config_data/`) before downloading with retry logic
- Detailed failure dialog listing each missing/failed config by name and status
- Per-tab loading indicators
- Standard Soho toolbar with More button (personalize columns, row height, filter)
- When opened from Custom List Checker, pre-populates with distinct records from current datagrid

### Enhanced: All Component Modals (Draggable)

- Bulk Export, Custom List Export, and DES-030 modals are now draggable by header
- Native mousedown/mousemove implementation with viewport containment
- Delayed positioning (500ms) to account for data loading
- max-height: 90vh with internal scrolling

### Added: Environment-based Dev Token

- `src/environments/environment.ts` with `ionApiDevToken` for local ION API development
- Single `APP_INITIALIZER` sets token once for all components
- Removed all per-component `setDevelopmentToken` / `isLocalhost` calls
- File gitignored to prevent token commits

### Enhanced: Custom List Checker Tab

- Added "Export Config" icon button in datagrid toolbar
- Opens Bulk Export modal pre-populated with current dataset
- Fixed file upload event type (`SohoFileUploadEvent` → `any`)

### Docs

- Added Export Configurations feature page
- Updated Custom List Checker docs with export functionality
- Updated Getting Started with ION API token setup instructions
- Updated Dataflow List docs to mention draggable DES-030 dialog
- Updated index.md feature table descriptions

---

## 2026-07-07

### Enhanced: Grid API Service — Session Cache with Tenant-Scoped Keys

- `GridApiService.getMappings()` now checks `sessionStorage` before making Grid API calls
- Cache key includes tenant ID for multi-tenant safety (e.g., `grid_api_cache_TENANT_mappings`)
- Data persists for the browser tab session — automatically cleared on tab close or logout
- `getMappings(bypassCache)` accepts an optional `bypassCache` flag to force a fresh fetch
- `clearCache()` now also removes the session entry alongside the in-memory cache
- New `clearSessionCache()` method to wipe all grid API cache entries at once

---

## 2026-07-02

### Enhanced: App Startup — Pre-load Grid API Data

- Grid API mappings are now fetched in the background at app startup (after user context is loaded)
- MEC Mapping Viewer, Custom List Checker, Dataflow List, and Log Configuration tabs load instantly since data is already cached

### Enhanced: Event Hub Formatter Tab

- **Selected subscriptions float to top** — Uses Soho dropdown's built-in `moveSelected: 'all'` to show selected items at the top of the list

### Enhanced: XtendM3 CRUD Generator Tab

- **Full-screen code preview modal** — Replaced inline bottom panel with a centered modal overlay (90vw × 85vh) for focused code editing
- **Editable code** — Monaco editors are now read-write; edits are preserved per tab and used when uploading or downloading
- Modified tab indicator (blue dot) shows which transactions have been manually edited
- Upload and Download buttons in the modal header for quick actions directly from the preview
- Clicking outside the modal (on the overlay) closes it
- Download and Upload from toolbar also use edited code when preview tabs have modifications

### Enhanced: Navigation — Module Nav Sidebar with Angular Router

- Replaced vertical Soho tabs with a custom module-nav sidebar (IDS-aligned spacing and styling)
- Icons for each nav item with IDS icon set (document, search-list, calendar, script, etc.)
- Collapsible sidebar: expanded (300px with labels) or collapsed (56px icon rail) via hamburger toggle
- Search/filter for nav items — filters as you type, clears on X button
- Angular Router integration with hash routing (`useHash: true`) for H5 SDK compatibility
- `CacheRouteReuseStrategy` preserves component state across navigation (no reset on tab switch)
- Sidebar and header on same row — sidebar spans full viewport height, header only in content area

### Enhanced: Theme Support

- **Theme switching** — Mode (Light/Dark/Contrast) and Color (Default, Amber, Amethyst, Azure, Emerald, Graphite, Ruby, Slate, Turquoise) via submenu in More button
- Checkmark indicator on currently active mode and color
- `ThemeService` — shared service managing Monaco editor theme globally
- Monaco editors respond to theme changes across all cached routes (re-applied on navigation)
- All custom CSS uses `inherit`, `currentColor`, and `rgba()` — fully theme-responsive
- Chat components (Kiro Chat, GenAI Chat) styled with semi-transparent colors for dark mode support

### Refactored: App Architecture

- `AppComponent` stripped to thin shell (user context + locale init only)
- Header, navigation, theme, and about modal moved to `MainComponent`
- Removed dead code: old personalize handlers, unused ViewChild refs, duplicate about modal
- Cleaned XtendM3 code preview CSS to be theme-responsive
- MEC Variable Sanitizer: removed dynamic editor resize (fixed height with internal scroll)

### Enhanced: MEC Variable Sanitizer

- Fixed overlapping Monaco editors — both now use fixed 300px height with internal scrolling
- Instructions box styled with `rgba()` for dark mode compatibility
- Removed content-based auto-resize that caused layout issues

---

## 2026-06-20

### New: Log Configuration Tab

- Browse all EC/MEC logger classes with their current log levels in a Soho datagrid
- Inline dropdown editor on the Level column to change log level per class (DEBUG, DIAG, INFO, WARN, ERROR, FATAL)
- Loading indicator shown during API calls
- Uses Grid API `LogConfigurationPage` endpoint with CSRF token handling
- Full Soho toolbar with keyword search, filter, row height, and personalize columns

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
