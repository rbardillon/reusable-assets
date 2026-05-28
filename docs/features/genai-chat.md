---
layout: default
title: GenAI Chat
parent: Features
nav_order: 7
---

# GenAI Chat
{: .no_toc }

AI chat interface powered by Infor's GenAI LLM Service with image and document analysis.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The GenAI Chat tab provides a conversational AI interface that connects to Infor's GenAI backend. It supports session management, message history, streaming responses, and multimodal input (images + documents).

## Capabilities

### Session Management
- Create new chat sessions
- Browse and resume previous sessions (sorted by last updated)
- View full message history for any session

### Streaming Responses
- Real-time streaming of AI responses via SSE (GenAI Chat Service)
- Human and AI messages displayed in a chat bubble UI

### Image & Document Upload
- Attach images (PNG, JPEG, GIF, WebP) for AI vision interpretation
- Attach documents (PDF, HTML, TXT, CSV, DOC, DOCX, XLS, XLSX, MD, XML, JSON) for analysis
- Unsupported image formats (e.g. AVIF, BMP) auto-converted to PNG via canvas
- Multiple files per message supported
- Files displayed as chips with filename, size, and remove button

### LLM Service Integration
- Uses `GENAI/llmsvc/api/v1/messages` endpoint
- Requires `x-infor-logicalidprefix: lid://infor.genai.genai` header
- Images sent as `{ type: "image", data: "data:image/png;base64,..." }`
- Documents sent as `{ type: "document", data: { format, name, data } }`
- Model: Claude Sonnet 4.5 via Bedrock Converse API

### ChatGPT-style Composer
- Sticky bottom rounded box with subtle shadow
- Auto-growing textarea (up to 200px max height, then scrolls)
- Circular ⊕ attach button (left) and send arrow (right)
- Enter sends, Shift+Enter for newline
- Send disabled when no text and no files attached

## Usage

1. Type a message and press **Enter** to start a new session
2. Click the ⊕ button to attach images or documents
3. Attached files appear as chips above the textarea — click ✕ to remove
4. Press **Enter** or click the send button to submit
5. Click **Sessions** to browse or resume previous conversations
6. Click **New Chat** to start fresh
