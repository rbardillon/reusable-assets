---
layout: default
title: MEC Mapping Viewer
parent: Features
nav_order: 4
---

# MEC Mapping Viewer
{: .no_toc }

Browse MEC mappings and view compiled Java source code with syntax highlighting.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The MEC Mapping Viewer provides a read-only interface to browse all MEC (M3 Enterprise Collaborator) mappings in your environment and inspect their compiled Java source code.

## Capabilities

### Mapping Browser
- Filterable and sortable lookup of all published MEC mappings
- Data comes from the standard ION API Gateway administration API (`GET M3/iec/api/administration/v1/mappings`) via `MecMappingAdminService`, replacing the previous internal Grid UI REST scrape
- The lookup shows the full set of fields from the gateway response: Mapping Name, Version, State, Published By, Published (date), and Standard
- Mappings are loaded once and cached per tenant in session storage

### Code Viewer Source
- Java source is retrieved from the gateway endpoint `GET /v1/mappings/{name}/{version}/source?standard={true|false}`
- No Grid UI navigation payloads are used

### Code Viewer
- Monaco Editor integration for Java source code display
- Syntax highlighting, minimap, and search
- Read-only view of compiled mapping logic
- A busy indicator appears over the editor while source is being fetched, with a loading placeholder so no stale content is shown during the request

## Usage

1. Browse mappings in the datagrid
2. Select a mapping row to load its Java source
3. Use Monaco's built-in search (`Ctrl+F`) to navigate the code
