---
layout: default
title: Dataflow List
parent: Features
nav_order: 6
---

# Dataflow List
{: .no_toc }

Browse ION dataflows, extract dependencies, and generate DES-030 documents.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Dataflow List tab connects to the ION Connect API to list all dataflows in your environment. Selecting a dataflow extracts its full dependency tree — mappings, connection points, file templates, object schemas, scripts, workflows, and custom lists — and can generate a DES-030 design document.

## Capabilities

### Dependency Extraction
- ION Mappings
- Connection Points (with file template resolution)
- Application Connections
- Splitters & CBR Filters
- Scripts & Workflows
- Object Schemas (nouns)

### Custom List Resolution
- Automatically matches APPLICATION nouns to MEC mappings
- Extracts CMS100MI/MDBREADMI transactions from matched mappings
- Fetches custom list data via `EXT100MI.LstCustListData`

### DES-030 Generation
- Generates a Word document (`.docx`) with all extracted dependencies
- Configurable user story, title, and change references
- Includes connection point details and custom list data

### Clipboard Copy
- Copy all grouped dependency info to clipboard in text format

## Usage

1. Select a dataflow from the dropdown
2. Review the extracted dependency groups
3. Optionally fill in DES-030 fields (user story, title, change refs)
4. Click **Generate DES-030** to download the Word document, or **Copy** to clipboard
