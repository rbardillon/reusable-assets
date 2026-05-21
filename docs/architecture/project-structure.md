---
layout: default
title: Project Structure
parent: Architecture
nav_order: 1
---

# Project Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Directory Layout

```
src/app/
├── components/
│   ├── main/                        # Root layout component
│   └── tabs/                        # Feature tabs
│       ├── custom-bod-generator/
│       ├── custom-list-checker/
│       ├── dataflow-list/
│       ├── event-hub-formatter/
│       ├── genai-chat/
│       ├── generators/
│       ├── kiro-chat/
│       ├── mec-mapping-viewer/
│       ├── mec-variable-validations/
│       ├── object-schema-editor/
│       └── xtendm3-crud-generator/
├── generators/
│   └── des030/                      # DES030 code generators
├── service/                         # Shared services
└── app.module.ts                    # Root module
```

## Key Dependencies

| Package | Purpose |
|:--------|:--------|
| `@infor-up/m3-odin` | M3 API client and utilities |
| `@infor-up/m3-odin-angular` | Angular bindings for M3 Odin |
| `ids-enterprise-ng` | Infor Design System (Soho) components |
| `monaco-editor` | Code editor for MEC viewer and generators |
| `jszip` | ZIP file generation for downloads |
| `fast-xml-parser` | XML parsing for ZAP/BOD files |
| `file-saver` | Client-side file downloads |
| `docx` | Word document generation |
