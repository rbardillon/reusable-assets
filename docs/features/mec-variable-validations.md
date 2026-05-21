---
layout: default
title: MEC Variable Validations
parent: Features
nav_order: 9
---

# MEC Variable Validations
{: .no_toc }

Generate null-safe trim statements from MEC Java class fields.
{: .fs-6 .fw-300 }

---

## Overview

The MEC Variable Validations tab takes a Java class (typically from a MEC mapping) and generates null-safe trim statements for all `String` fields. This is a common pattern needed in MEC mappings to sanitize input variables.

## How It Works

Paste a Java class containing `private String` field declarations. The tool extracts all field names and generates:

```java
fieldName = (fieldName == null) ? "" : fieldName.trim();
```

for each field.

## Usage

1. Paste your MEC Java class into the input editor
2. Click **Generate**
3. Copy the generated trim statements from the output editor into your mapping
