---
layout: default
title: Services
parent: Architecture
nav_order: 2
---

# Services
{: .no_toc }

Shared Angular services that provide M3 connectivity and business logic.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## MI API Service

`mi-api.service.ts`

Wraps `@infor-up/m3-odin` to call M3 API (MI) transactions. Used by most tabs for CRUD operations against standard and custom APIs.

## Grid API Service

`grid-api.service.ts`

Connects to the M3 Grid API for fetching MEC mappings and other grid-based data. Results are cached across tabs to avoid redundant network calls.

## ION Connect Service

`ion-connect.service.ts`

Handles ION API Gateway connectivity including OAuth token management and endpoint routing.

## ION Data Catalog Service

`ion-data-catalog.service.ts`

Interfaces with the ION Data Catalog for metadata and schema operations.

## User Context Service

`user-context.service.ts`

Provides the current M3 user context (company, division, user ID). Auto-populated from the M3 session when running inside H5.

## Message Service

`message.service.ts`

Centralized notification/messaging service for displaying alerts and status messages across components.

## Kiro Chat Service

`kiro-chat.service.ts`

Manages SSE connections to the local Kiro backend, handling message streaming and connection lifecycle.

## GenAI Chat Service

`genai-chat.service.ts`

Service layer for the GenAI chat integration.

## DES030 Generator Service

`des030-generator.service.ts`

Business logic for generating DES030 (Experience Designer) configurations.
