---
layout: default
title: Object Schema Editor
parent: Features
nav_order: 10
---

# Object Schema Editor
{: .no_toc }

Browse, create, edit, and update ION object schema (noun) XSD definitions with GenAI-assisted generation.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Object Schema Editor connects to the ION Data Catalog API to list available nouns, load their XSD schema content, register new schemas, and push updates back to the catalog. It includes GenAI integration for natural language schema generation and modification.

## Modes

The editor has two modes, selectable via radio buttons:

### Add Mode
- Enter a new noun name
- Write XSD manually in the Monaco editor, or use GenAI to generate it from a description
- Click **Register Schema** to add the new noun to the ION Data Catalog
- Includes existence check — if the noun already exists, prompts for overwrite confirmation

### Update Mode
- Select an existing noun from the dropdown
- Edit the loaded XSD in the Monaco editor, or use GenAI to describe modifications
- Click **Update Schema** to push changes to the Data Catalog

## Capabilities

### Noun Browsing
- Lists all nouns from the ION Data Catalog
- Filters by tenant (e.g. shows only tenant-specific nouns for Goldwin environments)
- Refresh button to reload the noun list

### Schema Editing
- Monaco Editor with XML syntax highlighting
- Auto-resizing editor (up to 700px height)
- Built-in XML formatter for readability

### Schema Registration (Add)
- Register new nouns in the ION Data Catalog
- Auto-generates noun metadata XML with default supported verbs (Show, Get, Update, Acknowledge, Sync, Process, Load)
- Extracts field names from XSD for metadata ID XPath
- Checks for existing nouns before registering

### Schema Update
- Push modified XSD back to the ION Data Catalog
- Validation feedback on success or failure
- User context auto-populated for audit trail

### Metadata Editing (Update)
In addition to the XSD schema, update mode can edit the noun **metadata** (NounMetadata XML). When a noun is loaded, its metadata is fetched and can be edited via the collapsible **Edit Metadata** panel:

- **Noun Name** — read-only. It identifies the schema being updated and is shown for reference only.
- **Document ID** — a field picker dropdown paired with an editable **ID XPath** text box:
  - The **dropdown** lists every leaf field in the current XSD, traversing nested structures so fields buried inside a repeating or nested element appear as noun-relative paths (e.g. `Data/CONO`, `Data/UUID`); attributes appear as `Element@attr`. Selecting one fills in the ID XPath for you. A **refresh** button reloads the options after you edit the schema.
  - The **ID XPath** text box is the source of truth. Edit it directly for advanced identifiers the picker cannot express, such as predicates and selectors — e.g. `/*/DataArea/Noun/DocumentID[1]/ID[not(@schemeName)]`.
- **Supported Verbs** — checkboxes to toggle Show, Get, Update, Acknowledge, Sync, Process, and Load

The edited metadata is sent together with the XSD when you click **Update Schema**. Previously the fetched metadata was passed through unchanged and could not be edited in the UI.

#### Document ID validation
Because the XSD can be edited freely, the **entire** ID XPath is validated against the schema structure before an update is sent — not just its last segment. This prevents saving a path whose field name happens to exist but whose overall path is wrong (e.g. `/*/Bogus/DocumentID`).

**Update Schema** is blocked with an inline error when the path:

- is empty,
- is not an absolute path (must start with `/`),
- has empty segments (e.g. `//`),
- is missing the `DataArea` element,
- does not reference the correct noun element after `DataArea`, or
- contains a plain element/attribute step that is not a declared child of the preceding element in the schema.

When a segment doesn't resolve, the error names the invalid segment and lists the valid child elements at that level, so you can correct the path.

Advanced XPath steps — functions, wildcards (`*`), axis specifiers (`::`), or non-positional predicates like `[not(@schemeName)]` — cannot be checked against the XSD element tree, so they are accepted and deep validation stops at that step. A simple positional predicate such as `DocumentID[1]` is still checked by its element name. If the XSD cannot be parsed into a structure, the deep structural check is skipped entirely (the basic syntax checks still apply) so a legitimate save is not blocked.

### GenAI Assist
- Toggle the GenAI panel via the sparkle icon button
- Describe your schema or modification in natural language
- In **Add mode**: generates a complete XSD from your description (uses noun name as root element)
- In **Update mode**: modifies the currently loaded XSD based on your instructions
- Powered by Infor GenAI LLM Service (Claude via ION API)

## Usage

### Adding a New Schema
1. Select **Add** radio button
2. Enter a noun name (e.g. `CustomWarrantyClaim`)
3. Click the **GenAI** icon and describe your schema (e.g. "Create a schema with fields: claimId, itemNumber, customerName, claimDate, status, description")
4. Click **Generate** — the XSD populates in the editor
5. Optionally click **Format XML** to pretty-print
6. Click **Register Schema** to add to the Data Catalog

### Updating an Existing Schema
1. Select **Update** radio button
2. Select a noun from the dropdown
3. Optionally click the **GenAI** icon and describe your change (e.g. "Add a Status field with enum values Active and Closed")
4. Click **Generate** — the XSD is modified in place
5. Optionally click **Edit Metadata** to change the Noun Name, ID XPath (document identifier), or Supported Verbs
6. Click **Update Schema** to push changes (both the XSD and any metadata edits are sent)

### Replacing the Document ID
1. Select **Update** and load the noun
2. Click **Edit Metadata**
3. If you have just edited the schema, click the **refresh** button next to the Document ID dropdown to reload the field list
4. Pick the new identifier from the **Document ID** dropdown (the list is drawn from the fields in the current XSD); the full XPath is set for you
5. Click **Update Schema** — the derived ID XPath is validated against the schema before the update is sent
