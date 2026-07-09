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
5. Click **Update Schema** to push changes
