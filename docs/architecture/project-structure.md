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
│       ├── export-configurations/
│       ├── genai-chat/
│       ├── generators/
│       ├── kiro-chat/
│       ├── log-configuration/
│       ├── mec-map-download/
│       ├── mec-mapping-viewer/
│       ├── mec-variable-validations/
│       ├── object-schema-editor/
│       └── xtendm3-crud-generator/
├── generators/
│   └── des030/                      # DES030 code generators
├── service/                         # Shared services
└── app.module.ts                    # Root module

docs-site/
├── docs/
│   ├── architecture/                # Architecture documentation
│   ├── configuration/               # Configuration guides
│   ├── features/                    # Feature documentation pages
│   ├── getting-started/             # Getting started guides
│   └── changelog.md                 # Published changelog
├── generate-pdf.js                  # PDF generator script
├── index.md                         # Home page
└── package.json                     # Docs-site dependencies (md-to-pdf)
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

## Documentation Site

The `docs-site/` directory is a Jekyll-based documentation site published separately. It also includes a PDF generation script.

### PDF Generation

`docs-site/generate-pdf.js` combines all documentation markdown files into a single PDF using `md-to-pdf`. It:

1. Reads files in navigation order (matching Jekyll `nav_order`)
2. Strips Jekyll front matter, Kramdown classes, and Liquid tags
3. Converts internal links (Liquid `link` tags and relative paths) to plain text so they don't resolve to localhost in the PDF
4. Preserves external `https://` links as clickable
5. Outputs `reusable-assets-docs.pdf`

Run with:

```bash
cd docs-site
npm run pdf
```
