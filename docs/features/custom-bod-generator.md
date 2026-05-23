---
layout: default
title: Custom BOD Generator
parent: Features
nav_order: 5
---

# Custom BOD Generator
{: .no_toc }

Generate CUSBOD mapping templates (.zap) for MEC import from a noun, verb, direction, and custom field list.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Custom BOD Generator creates ready-to-import `.zap` archives containing MEC mapping templates for custom BOD (Business Object Document) integrations. It uses pre-built CUSBOD templates and replaces placeholder values with your noun name and field definitions.

## Capabilities

### Template Generation
- Generates complete mapping folder structure (`.mapxml`, `.xsd`, `.xml`, `mapping.properties`)
- Supports **Sync**, **Acknowledge**, **Process**, **Show**, and **Load** verbs
- Supports **In**, **Out**, and **Error Out** directions

### Verb-Direction Constraints
- **Show** — Out only
- **Load** — In only
- **Acknowledge** — In, Out, or Error Out
- **Sync / Process** — In or Out

### Field Definitions
- Add custom noun properties via an interactive field list
- Reorder, edit, or remove fields before generation
- Fields are injected into the XSD noun schema and mapping XML

### Output Format
- XSD and `.mapxml` files encoded in UTF-16LE with BOM (required by MEC mapper)
- Downloads as a single `.zap` archive ready for MEC import

## Usage

1. Enter a **Noun** name (e.g. `CustomerOrder`)
2. Select a **Verb** from the dropdown
3. Choose a **Data Flow** direction (constraints auto-applied based on verb)
4. Add noun **Properties** using the field input
5. Click **Generate BOD** to download the `.zap` file
6. Import the `.zap` into MEC via the standard mapping import
