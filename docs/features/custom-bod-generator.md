---
layout: default
title: Custom BOD Generator
parent: Features
nav_order: 5
---

# Custom BOD Generator

{: .no_toc }

Generate MEC mapping templates (.zap) for custom and standard BOD integrations.
{: .fs-6 .fw-300 }

## Table of contents

{: .no_toc .text-delta }

1. TOC
   {:toc}

---

## Overview

The Custom BOD Generator creates ready-to-import `.zap` archives containing MEC mapping templates. It supports three modes:

- **Custom BOD** — Generate from scratch using CUSBOD templates with your noun, verb, direction, and field definitions
- **Standard BOD** — Clone a pre-configured standard BOD template (e.g. PurchaseOrder) with a custom noun prefix
- **Upload & Rename** — Upload any existing `.zap` export from MEC and rename the noun throughout

## Custom BOD Mode

### Capabilities

- Generates complete mapping folder structure (`.map`, `.xsd`, `.xml`, `mapping.properties`)
- Supports **Sync**, **Acknowledge**, **Process**, **Show**, and **Load** verbs
- Supports **In**, **Out**, and **Error Out** directions
- Full `.map` file content from original MEC templates (variables, links, implementations, sequences)
- Version log implementation block included in all templates
- Noun XSD and XML instance rebuilt with user-defined custom fields

### Verb-Direction Constraints

| Verb        | Allowed Directions |
| ----------- | ------------------ |
| Sync        | In, Out            |
| Process     | In, Out            |
| Show        | Out only           |
| Load        | In only            |
| Acknowledge | In, Out, Error Out |

### Usage

1. Select **Custom BOD** mode
2. Enter a **Noun** name (e.g. `CustomerOrder`)
3. Select a **Verb** from the dropdown
4. Choose a **Data Flow** direction
5. Add noun **Properties** using the field input (add, edit, remove, reorder)
6. Click **Generate BOD** to download the `.zap` file
7. Import the `.zap` into MEC via the standard mapping import

---

## Standard BOD Mode

### Overview

Clone a pre-configured standard BOD mapping template with a custom noun. This is used when customers want to use a standard BOD structure (e.g. PurchaseOrder) but with a customer-specific prefix (e.g. `CustPurchaseOrder`).

### Available Templates

| Template                 | Description                                     |
| ------------------------ | ----------------------------------------------- |
| PurchaseOrder - Sync Out | Standard M3 PurchaseOrder outbound sync mapping |

### Usage

1. Select **Standard BOD** mode
2. Choose a **Base Template** from the dropdown
3. Enter your **Custom Noun** (e.g. `CustPurchaseOrder`)
4. Click **Generate Standard BOD**
5. The template is lazy-loaded, noun is replaced throughout all files, and the `.zap` downloads

### Adding New Standard Templates

See the steering file `.kiro/steering/bod-template-generation.md` for instructions on adding new standard BOD templates.

---

## Upload & Rename Mode

### Overview

Upload any `.zap` file exported from MEC and rename the noun throughout all files. This works with any mapping — no pre-configuration needed.

### How It Works

1. Select **Upload & Rename** mode
2. Upload a `.zap` file (exported from MEC)
3. The base noun is auto-detected from the filename
4. Confirm or edit the **Base Noun** (the text to find and replace)
5. Enter your **Custom Noun** (the replacement text)
6. Click **Generate Renamed BOD**

### Technical Details

- Auto-detects file encoding (UTF-16BE, UTF-16LE, UTF-8) for each file in the zip
- Performs noun replacement on both file contents and filenames
- Re-encodes all XSD and `.map` files as UTF-16LE with BOM for MEC compatibility
- Preserves UTF-8 encoding for `.properties` and `.xml` files

---

## Output Format

All modes produce a `.zap` archive with:

- XSD and `.map` files encoded in **UTF-16LE with BOM** (required by MEC mapper)
- `.properties` and `.xml` files in **UTF-8**
- Folder naming convention: `M3BOD_{Noun}_{Verb}_{Direction}_{Version}_Custom`

The `.zap` file can be imported directly into MEC via the standard mapping import workflow.
