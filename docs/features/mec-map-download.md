---
layout: default
title: MEC Map Download
parent: Features
nav_order: 15
---

# MEC Map Download
{: .no_toc }

Download MEC mappings as .zap files via the IEC MapGen REST API.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The MEC Map Download tab allows you to download any MEC (M3 Enterprise Collaborator) mapping directly from the IEC MapGen server as a `.zap` archive file. The downloaded `.zap` is fully compatible with the Business Document Mapper's import function, making it easy to back up, transfer, or version-control mappings.

## How It Works

1. **Select a mapping** from the lookup (reuses the cached mapping list from Grid API)
2. **Click Download** to trigger the full download pipeline:
   - Fetches the mapping UUID from the MapGen REST API
   - Downloads the mapping via `GET /M3/iec/ecmapgen/v1/mapping/{name}/{version}/get/{uuid}`
   - Decodes the `ZippedMappingUnit` response (base64 → gzip decompress → UTF-16 decode)
   - Extracts the .map file, schema .xsd files, and mapping.properties
   - Packages everything into a `.zap` archive (ZIP format with DEFLATE compression)
3. **Browser downloads** the resulting `.zap` file

## Output .zap Structure

The generated `.zap` file matches the format produced by the Mapper's export function:

```
{MappingName}.zap
├── {MappingName}.map          — Mapping definition (UTF-16 XML)
├── {Schema1}.xsd              — Input/output schema files
├── {Schema2}.xsd
└── mapping.properties         — Mapping metadata
```

## Prerequisites

- Your user must have the **M3EC-ClientDesigntime** security role
- The ION API must be connected (`odin login -c <ionapi-file>`)
- The IEC MapGen context root must be accessible at `M3/iec/ecmapgen`

## Technical Details

### API Endpoints Used

| Step | Endpoint | Purpose |
|:-----|:---------|:--------|
| 1 | `GET .../mappings` | List all mappings to find UUID |
| 2 | `GET .../{name}/{version}/get/{uuid}` | Download mapping as ZippedMappingUnit |

### Decoding Pipeline

```
API Response XML
  └─ Extract <cdata> content (base64 string)
       └─ Base64 decode → compressed bytes
            └─ GZip decompress (DecompressionStream API)
                 └─ UTF-16LE decode (skip BOM)
                      └─ MappingUnit XML
```

### .zap File Generation

Uses JSZip to create the archive with DEFLATE compression. The `.map` file is encoded as UTF-16LE with BOM to match the Mapper's native format.

## Download Log

The component displays a real-time log showing each step of the process, including file names and sizes for each extracted artifact. This helps verify the download completed successfully and shows the mapping's composition.
