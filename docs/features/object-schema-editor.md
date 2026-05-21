---
layout: default
title: Object Schema Editor
parent: Features
nav_order: 10
---

# Object Schema Editor
{: .no_toc }

Browse, edit, and update ION object schema (noun) XSD definitions.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Object Schema Editor connects to the ION Data Catalog API to list available nouns, load their XSD schema content, and push updates back to the catalog.

## Capabilities

### Noun Browsing
- Lists all nouns from the ION Data Catalog
- Filters by tenant (e.g. shows only tenant-specific nouns for Goldwin environments)
- Refresh button to reload the noun list

### Schema Editing
- Monaco Editor with XML syntax highlighting
- Auto-resizing editor (up to 700px height)
- Built-in XML formatter for readability

### Schema Update
- Push modified XSD back to the ION Data Catalog
- Validation feedback on success or failure
- User context auto-populated for audit trail

## Usage

1. Select a noun from the dropdown
2. Click **Load** to fetch its XSD content
3. Optionally click **Format** to pretty-print the XML
4. Edit the schema as needed
5. Click **Update** to push changes to the Data Catalog
