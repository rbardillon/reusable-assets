---
layout: default
title: Event Hub Formatter
parent: Features
nav_order: 2
---

# Event Hub Formatter

{: .no_toc }

Browse, filter, and export Event Hub subscription events from your M3 environment.
{: .fs-6 .fw-300 }

## Table of contents

{: .no_toc .text-delta }

1. TOC
   {:toc}

---

## Overview

The Event Hub Formatter connects to your M3 environment's Event Hub to browse subscriptions, query events with filters, and export results.

## Capabilities

### Subscription Browsing

- Browse Event Hub subscriptions directly from the connected M3 environment
- Multi-select subscriptions for batch querying
- Selected subscriptions automatically sort to the top of the dropdown list for easy access

### Filtering

- Start time and time span configuration
- Criteria-based filtering on event properties

### Results Display

- Filterable and sortable datagrid for event results
- Row selection opens event detail in a Soho modal dialog
- Flattened element columns for easy reading

### Export

- Export events to CSV with flattened element columns
- Existing CSV/text formatting preserved for compatibility

## Usage

1. Select one or more subscriptions from the dropdown
2. Configure start time, time span, and optional criteria
3. Click **Search** to retrieve events
4. Click any row to view full event detail
5. Use **Export CSV** to download results
